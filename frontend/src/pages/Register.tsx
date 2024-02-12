import { FormEvent, useRef } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const username = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userUsername = username.current?.value ?? "";
    const userEmail = email.current?.value ?? "";
    const userPassword = password.current?.value ?? "";

    AuthService.register({
      username: userUsername,
      email: userEmail,
      password: userPassword,
    })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Error en el registro", error);
      });
  };

  return (
    <div className="h-screen">
      <div className="md:hidden flex flex-col items-center">
        <h1 className="text-8xl mt-14">Registro</h1>
        <img
          className="size-48 mt-10"
          src="images/TeamTaskRecortado.png"
          alt="Team Task Logo"
        />
        <form className="flex flex-col w-fit mt-10" onSubmit={handleSubmit}>
          <label className="text-3xl my-2">Nombre de usuario</label>
          <input
            className="border-1 border-gray-300 rounded-full p-2 m-2 w-80 h-14"
            type="text"
            ref={username}
          />
          <label className="text-3xl my-2">Correo</label>
          <input
            className="border-1 border-gray-300 rounded-full p-2 m-2 w-80 h-14"
            type="email"
            ref={email}
          />
          <label className="text-3xl my-2">Contraseña</label>
          <input
            className="border-1 border-gray-300 rounded-full p-2 m-2 w-80 h-14"
            type="password"
            ref={password}
          />
          <button
            className="mt-8 border-2 border-gray-300 p-2 m-2 rounded-full text-4xl text-white bg-navbar"
            type="submit"
          >
            Registrarse
          </button>
        </form>
      </div>

      <div className=" hidden md:flex w-full h-full  items-center justify-between">
        <div className="w-[50%] h-full flex items-center justify-center">
        <img
          
          src="images/TeamTaskRecortado.png"
          alt="Team Task Logo"
        />
        </div>
        <div className="flex flex-col items-center h-full w-2/4 justify-center">
          <h1 className="text-8xl mt-14">Grande</h1>

          <form className="flex flex-col w-fit mt-10" onSubmit={handleSubmit}>
            <label className="text-3xl my-2">Nombre de usuario</label>
            <input
              className="border-1 border-gray-300 rounded-full p-2 m-2 w-80 h-14"
              type="text"
              ref={username}
            />
            <label className="text-3xl my-2">Correo</label>
            <input
              className="border-1 border-gray-300 rounded-full p-2 m-2 w-80 h-14"
              type="email"
              ref={email}
            />
            <label className="text-3xl my-2">Contraseña</label>
            <input
              className="border-1 border-gray-300 rounded-full p-2 m-2 w-80 h-14"
              type="password"
              ref={password}
            />
            <button
              className="mt-8 border-2 border-gray-300 p-2 m-2 rounded-full text-4xl text-white bg-navbar"
              type="submit"
            >
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
