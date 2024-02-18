import { Button, Form, Input, InputRef } from "antd";
import authService from "../services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useRef } from "react";
import { registerValidation } from "../utils/shared/globalFunctions";

export default function Register() {
  const userNameRef = useRef<InputRef>(null);
  const emailRef = useRef<InputRef>(null);
  const passwordRef = useRef<InputRef>(null);

  const navigate = useNavigate();
  type FieldType = {
    username?: string;
    email?: string;
    password?: string;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userNameValue = userNameRef.current?.input?.value;
    const emailValue = emailRef.current?.input?.value;
    const passwordValue = passwordRef.current?.input?.value;

    const isValid = registerValidation(
      emailValue,
      passwordValue,
      userNameValue
    );

    if (isValid) {
      authService
        .register({
          username: userNameValue!,
          email: emailValue!,
          password: passwordValue!,
        })
        .then((data) => {
          localStorage.setItem("token", data.access_token);
          navigate("/home");
        });
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="flex flex-col sm:flex-row justify-center align-middle items-center sm:h-[500px] sm:w-[800px] w-[350px] mx-auto  rounded-lg shadow-2xl overflow-hidden">
        <div className="flex flex-col justify-center items-center w-[400px] bg-orange-400/70 h-full">
          <h1 className="flex font-bold text-6xl h-24 justify-center mt-5">
            TeamTask
          </h1>
          <img
            className="size-52 sm:size-80 -mt-10"
            src="/assets/images/TeamTaskRecortado.png"
            alt="Logo"
          />
        </div>
        <form
          className="flex flex-col w-[400px] relative h-full bg-slate-300"
          onSubmit={handleSubmit}
        >
          <h1 className=" flex font-bold text-5xl h-24 justify-center mt-5">
            Registrarte
          </h1>
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col w-72">
              <Form.Item<FieldType>
                label="Nombre de usuario"
                style={{ fontWeight: "bold" }}
              ></Form.Item>
              <Input style={{ marginTop: "-20px" }} ref={userNameRef} />
            </div>
            <div className="flex flex-col w-72">
              <Form.Item<FieldType>
                label="Correo electronico"
                style={{ fontWeight: "bold" }}
              ></Form.Item>
              <Input
                style={{ marginTop: "-20px" }}
                ref={emailRef}
                type="email"
              />
            </div>
            <div className="flex flex-col w-72">
              <Form.Item<FieldType>
                label="Contraseña"
                style={{ fontWeight: "bold" }}
              ></Form.Item>
              <Input.Password
                style={{ marginTop: "-20px" }}
                ref={passwordRef}
              />
            </div>
            <div className="flex flex-col w-72 justify-center items-center  mt-12">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ backgroundColor: "blue" }}
                >
                  Registrarse
                </Button>
              </Form.Item>
            </div>
            <div className="flex flex-col w-72 justify-center items-center  mt-12 text-sm absolute  bottom-0 sm:bottom-10">
              <p>
                Ya tienes una cuenta?
                <span className="text-blue-500 underline">
                  <Link to="/login">Iniciar sesión</Link>
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
