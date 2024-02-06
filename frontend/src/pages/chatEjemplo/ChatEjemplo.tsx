import { FormEvent, useEffect, useRef, useState } from "react";
import "./chatEjemplo.css";
import { useParams } from "react-router-dom";

export default function ChatEjemplo() {
  const [messages, setMessages] = useState<string[]>([]);
  const { username } = useParams();
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    const SERVER_URL = "ws://localhost:8080";
    ws.current = new WebSocket(SERVER_URL);

    ws.current.onopen = () => {
      console.log("WebSocket connection established.");
    };

    ws.current.onmessage = (event) => {
      const message = event.data;
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = event.currentTarget.message as HTMLInputElement;
    const message = input.value;

    const messageWithUsername = `${username}: ${message}`;

    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(messageWithUsername);
    }
    input.value = "";
  };

  return (
    <>
      <section id="chat">
        <form id="form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="message"
            id="input"
            placeholder="Type a message"
            autoComplete="off"
          />
          <button type="submit">Enviar</button>
        </form>
        <div>
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </div>
      </section>
    </>
  );
}
