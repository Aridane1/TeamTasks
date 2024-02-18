import { Button, Input, InputRef } from "antd";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { webSocketEndpoint } from "../constants/backendEndpoints";
import { decodeToken } from "../utils/shared/globalFunctions";

export default function Chat() {
  const [textMessage, setTextMessage] = useState<string>("");

  const [messages, setMessages] = useState<{ message: string }[]>([]);
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
    console.log(textMessageValue);
    const parseMessage = {
      message: textMessageValue,
      type: "sendMessage",
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
        console.log(message);
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    };
    return () => {
      ws.current?.close();
    };
  }, [user.id, taskId]);

  return (
    <div className="">
      <div className="">{title} Chat</div>

      <div>
        {messages.map((message, index) => (
          <div key={index}>{message.message}</div>
        ))}
      </div>
      <form onSubmit={(e) => handleSendMessage(e)}>
        <Input
          id="messageField"
          ref={textMessageRef}
          value={textMessage}
          onChange={handleChange}
        />
        <Button color="primary" htmlType="submit">
          Enviar
        </Button>
      </form>
    </div>
  );
}
