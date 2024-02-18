import { Button, Input, InputRef } from "antd";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { webSocketEndpoint } from "../constants/backendEndpoints";
import { decodeToken } from "../utils/shared/globalFunctions";
import { SendOutlined } from "@ant-design/icons";

export default function Chat() {
  type MessageType = {
    message: string;
    type: string;
    username: string;
  };

  const [textMessage, setTextMessage] = useState<string>("");

  const [messages, setMessages] = useState<MessageType[]>([]);
  const location = useLocation();
  const params = useParams();
  const ws = useRef<WebSocket | null>(null);
  const textMessageRef = useRef<InputRef>(null);

  const taskId = params.taskId;
  const { title } = location.state || {};

  const user = decodeToken();

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
    };
    const messageWithUsername = JSON.stringify(parseMessage);

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(messageWithUsername);
      setTextMessage("");
    }
  };

  useEffect(() => {
    const SERVER_URL = `${webSocketEndpoint}?&user_id=${user.id}&task_id=${taskId}`;
    ws.current = new WebSocket(SERVER_URL);

    ws.current.onopen = () => {
      console.log("WebSocket connection established.");
    };

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === "NEW_MESSAGE") {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };
    return () => {
      ws.current?.close();
    };
  }, [user.id, taskId]);

  return (
    <div>
      <div className="h-16 flex items-center justify-center bg-yellow-100 fixed w-full top-0 z-10">
        <p className="text-3xl">{title} Chat</p>
      </div>

      <div className="flex w-[95%]  mx-auto mt-20 mb-10">
        <div className="w-full flex flex-col gap-y-5">
          {messages.map((message, index) => {
            if (message.username === user.username) {
              return (
                <div
                  key={index}
                  className="w-52 bg-white ml-auto capitalize  p-4 rounded-md border border-black relative"
                >
                  <p className="absolute top-0 right-5 text-xs">Tu</p>
                  <p className="break-words">{message.message}</p>
                </div>
              );
            }
            return (
              <div
                key={index}
                className="w-52 bg-white mr-auto capitalize p-4 rounded-md border border-black relative"
              >
                <p className="absolute top-0  text-xs">{message.username}</p>
                <p className="break-words">{message.message}</p>
              </div>
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
