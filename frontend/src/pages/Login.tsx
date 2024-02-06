import { FormEvent, useRef } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
interface User {
  email: string;
  password: string;
  username?: string;
}
export default function Login() {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userEmail = email.current?.value ?? "";
    const userPassword = password.current?.value ?? "";

    AuthService.login({
      email: userEmail,
      password: userPassword,
    }).then((data) => {
      localStorage.setItem("token", data.access_token);
      navigate("/home");
    });
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-8xl mt-14">Inicio</h1>
      <img className="size-48 mt-10" src="images/TeamTaskRecortado.png" />
      <div>
        <form className="flex flex-col w-fit mt-16" onSubmit={handleSubmit}>
          <label className="text-3xl my-3">Nombre de usuario</label>
          <input
            className="border-1 border-gray-300 rounded-full p-2 m-2 w-80 h-14"
            type="text"
            ref={email}
          />
          <label className="text-3xl my-3">Correo</label>
          <input
            className="border-1 border-gray-300 rounded-full p-2 m-2 w-80 h-14"
            type="text"
            ref={password}
          />
          <button
            className="mt-20 border-2 border-gray-300 p-2 m-2 rounded-full text-4xl text-white bg-navbar"
            type="submit"
          >
            Iniciar
          </button>
        </form>
      </div>
    </div>
  );
}
