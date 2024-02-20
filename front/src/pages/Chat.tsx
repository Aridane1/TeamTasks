import { Button, Input, InputRef, message } from "antd";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  backendMessageEnpoint,
  webSocketEndpoint,
} from "../constants/backendEndpoints";
import { decodeToken } from "../utils/shared/globalFunctions";
import { SendOutlined } from "@ant-design/icons";
import { Message } from "../components/Message";

interface SyncManager {
  getTags(): Promise<string[]>;
  register(tag: string): Promise<void>;
}

declare global {
  interface ServiceWorkerRegistration {
    readonly sync: SyncManager;
  }

  interface SyncEvent extends ExtendableEvent {
    readonly lastChance: boolean;
    readonly tag: string;
  }

  interface ServiceWorkerGlobalScopeEventMap {
    sync: SyncEvent;
  }
}

export default function Chat() {
  type MessageType = {
    message: string;
    type: string;
    username: string;
    user_id?: string;
    task_id?: string;
  };

  const [textMessage, setTextMessage] = useState<string>("");
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [offlineMessages, setOfflineMessages] = useState([]);

  const location = useLocation();
  const params = useParams();
  const ws = useRef<WebSocket | null>(null);
  const textMessageRef = useRef<InputRef>(null);

  const taskId = params.taskId;
  const { title } = location.state || {};

  const user = decodeToken();

  const GET_ALL_MESSAGES = "getAllMessages";
  const GET_LAST_MESSAGE = "getLastMessages";

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextMessage(event.target.value);
  };

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const textMessageValue = textMessageRef.current?.input?.value;
    const parseMessage = {
      message: textMessageValue,
      type: "sendMessage",
      username: user.username,
      taskId: taskId,
      userId: user.id,
    };
    const messageWithUsername = JSON.stringify(parseMessage);
    if (navigator.onLine) {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(messageWithUsername);
      }
    } else {
      registerBackgroundSync(parseMessage);
    }
    setTextMessage("");
  };

  const handleGetAllMessage = () => {
    const messages = {
      type: GET_ALL_MESSAGES,
      taskId: taskId,
      userId: user.id,
    };
    ws.current?.send(JSON.stringify(messages));
  };

  const handleAllMessagesReceived = ({ message }: { message: string }) => {
    localStorage.setItem("chatMessages", message);
    setMessages(JSON.parse(message));
  };

  const handleLastMessagesReceived = (message: string) => {
    const messages = JSON.parse(localStorage.getItem("chatMessages") ?? "");

    const messageArray: MessageType[] = JSON.parse(message);

    messageArray.forEach((data) => {
      messages.push(data);
    });

    localStorage.setItem("chatMessages", JSON.stringify(messageArray));
    setMessages(messageArray);
  };

  const registerBackgroundSync = (message: {
    message: string | undefined;
    type: string;
    username: string;
    taskId: string | undefined;
    userId: string | undefined;
  }) => {
    navigator.serviceWorker.ready
      .then((swRegistration) => {
        swRegistration.sync.register("message-sync");
      })
      .catch((err) => console.log(err));

    navigator.serviceWorker.ready.then((swRegistration) => {
      const token = localStorage.getItem("token");
      swRegistration.active?.postMessage({
        action: "offlineMessage",
        message: message,
        token: token,
        backendEndpoint: `${backendMessageEnpoint}/add-many`,
      });
    });
  };

  const updateMessages = (lastId: string) => {
    console.log(lastId);
    const message = {
      type: GET_LAST_MESSAGE,
      taskId,
      userId: user.id,
      lastId,
    };
    ws.current?.send(JSON.stringify(message));
  };

  useEffect(() => {
    const SERVER_URL = `${webSocketEndpoint}?&user_id=${user.id}&task_id=${taskId}`;
    ws.current = new WebSocket(SERVER_URL);

    ws.current.onopen = () => {
      console.log("WebSocket connection established.");
      handleGetAllMessage();
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "NEW_MESSAGE") {
        console.log(message.type);
        setMessages((prevMessages) => [...prevMessages, message]);
      }

      if (message.type === GET_ALL_MESSAGES) {
        handleAllMessagesReceived({ message: message.messages });
      }

      if (message.type === GET_LAST_MESSAGE) {
        handleLastMessagesReceived(message.messages);
      }
    };

    return () => {
      ws.current?.close();
    };
  }, [user.id, taskId]);

  useEffect(() => {
    if (!navigator.onLine) {
      const offlineMessages = JSON.parse(
        localStorage.getItem("offline-messages") ?? ""
      );
      setOfflineMessages(offlineMessages || []);
    }

    const handleMessageFromServiceWorker = (event: MessageEvent) => {
      if (event.data.type === "sync-message") {
        message.loading(
          "Vuelves a tener conexión, actualizando mensajes...",
          1
        );
        const messages = JSON.parse(localStorage.getItem("chatMessages") ?? "");
        updateMessages(messages[messages.length - 1]._id);
        setOfflineMessages([]);
        localStorage.setItem("offlineMessages", JSON.stringify([]));
      }
    };
    navigator.serviceWorker.addEventListener(
      "message",
      handleMessageFromServiceWorker
    );
  }, []);

  return (
    <div>
      <div className="h-16 flex items-center justify-center bg-yellow-100 fixed w-full top-0 z-10">
        <p className="text-3xl">{title} Chat</p>
      </div>

      <div className="flex w-[95%]  mx-auto mt-20 mb-10">
        <div className="w-full flex flex-col gap-y-5">
          {messages.map((message, index) => {
            return (
              <Message
                username={message.username}
                index={index}
                message={message.message}
                user={user.username}
                key={index}
              />
            );
          })}
        </div>
      </div>

      <div className="fixed w-full bottom-0">
        <form onSubmit={(e) => handleSendMessage(e)} className="flex">
          <Input
            id="messageField"
            ref={textMessageRef}
            value={textMessage}
            onChange={handleChange}
          />
          <Button
            htmlType="submit"
            className="bg-blue-500 text-white flex items-center"
          >
            <SendOutlined />
          </Button>
        </form>
      </div>
    </div>
  );
}
