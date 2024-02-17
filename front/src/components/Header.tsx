import { Popover } from "antd";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/AuthService";

export default function Header() {
  const navigate = useNavigate();

  const handleLogOut = () => {
    authService.logout().then(() => {
      navigate("/login");
    });
  };

  const content = (
    <div className="flex flex-col px-4 gap-y-2 ">
      <Link to={"/statistics"}>
        <div className="flex items-center gap-2">
          <img
            src="/assets/icons/chart-simple-solid.svg"
            alt="statistics"
            className="size-4"
          />
          <span className="text-black hover:text-blue-300 transition-colors duration-300">
            Estadisticas
          </span>
        </div>
      </Link>

      <Link to={"/settings"}>
        <div className="flex items-center gap-2">
          <img
            src="/assets/icons/gear-solid.svg"
            alt="statistics"
            className="size-4"
          />
          <span className="text-black hover:text-blue-300 transition-colors duration-300">
            Configuración
          </span>
        </div>
      </Link>
      <div onClick={handleLogOut} className="flex items-center gap-2">
        <img
          src="/assets/icons/arrow-right-from-bracket-solid.svg"
          alt="statistics"
          className="size-4"
        />
        <span className="text-black hover:text-blue-300 transition-colors duration-300">
          Cerrar sesión
        </span>
      </div>
    </div>
  );

  return (
    <div className="flex h-[100px] items-center w-full border-b-2 border-black">
      <div className="flex items-center justify-center sm:justify-between w-full sm:w-[90%] mx-auto ">
        <Link to={"/home"}>
          <div className="flex items-center">
            <img
              className="size-24"
              src="/assets/images/TeamTaskRecortado.png"
            />
            <p className="text-3xl font-semibold">TeamTask</p>
          </div>
        </Link>
        <div className="sm:flex gap-5 hidden items-center font-semibold">
          <Link to={"/home"}>Incio</Link>
          <Link to={"/createTask"}>Crear Tarea</Link>
          <Link to={"/chat"}>Chat</Link>
          <Popover content={content} trigger="click">
            <img
              src="/assets/icons/profile.svg"
              alt="ver información del perfil"
              className="cursor-pointer size- rounded-full"
            />
          </Popover>
        </div>
      </div>
    </div>
  );
}
