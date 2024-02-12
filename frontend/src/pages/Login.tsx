import { FormEvent, useRef } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";

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
    <div className="h-screen">
      <div className="flex flex-col items-center md:hidden">
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

      <div className=" hidden md:flex w-full h-full  items-center justify-between">
        <div className="w-[50%] h-full flex items-center justify-center">
          <img  src="images/TeamTaskRecortado.png" />
        </div>
        <div className="flex flex-col items-center h-full w-2/4 justify-center">
          <h1 className="text-8xl mt-14">Inicio</h1>

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
      </div>
    </div>
  );
}
