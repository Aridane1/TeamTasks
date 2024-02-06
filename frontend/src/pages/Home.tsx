import { FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const input = event.currentTarget.message as HTMLInputElement;
    const message = input.value;

    input.value = "";
    console.log(message);
    navigate(`/chat-ejemplo/${message}`);
  };
  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="message"
          id="input"
          placeholder="Type a username"
          autoComplete="off"
        />
        <button type="submit">Entrar al chat</button>
      </form>
    </>
  );
}
