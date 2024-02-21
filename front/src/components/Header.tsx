import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Popover } from "antd";
import authService from "../services/AuthService";
import configurationService from "../services/ConfigurationService";
import { backendImageEndpoint } from "../constants/backendEndpoints";

export const Header = () => {
  type Configuration = {
    user_image: string;
  };
  const navigate = useNavigate();

  const [configuration, setConfiguration] = useState<Configuration>();

  const getConfigurationUser = async () => {
    try {
      const response = await configurationService.getConfigurationByUser();
      setConfiguration(response.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLogOut = () => {
    authService.logout().then(() => {
      navigate("/login");
    });
  };

  useEffect(() => {
    getConfigurationUser();
  }, []);

  const content = (
    <div className="flex flex-col px-4 gap-y-2 ">
      <Link to={"/statistics"}>
        <div className="flex items-center gap-2">
          <img
            src="/assets/icons/chart-simple-solid.svg"
            alt="estadisticas"
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
            alt="configuración"
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
          alt="cerrar sesion"
          className="size-4"
        />
        <span className="text-black hover:text-blue-300 transition-colors duration-300 cursor-pointer">
          Cerrar sesión
        </span>
      </div>
    </div>
  );

  return (
    <div className="flex h-[100px] items-center w-full border-b-2 border-black select-none">
      <div className="flex items-center justify-center sm:justify-between w-full sm:w-[90%] mx-auto ">
        <Link to={"/home"}>
          <div className="flex items-center ">
            <img
              className="size-24"
              src="/assets/images/TeamTaskRecortado.png"
            />
            <p className="text-3xl font-semibold hover:text-yellow-600/60  hover:scale-105 transition ease-in-out duration-200">
              TeamTask
            </p>
          </div>
        </Link>
        <div className="sm:flex gap-5 hidden items-center font-semibold">
          <Link to={"/home"}>
            <p className="hover:text-yellow-600/60 hover:scale-105 transition ease-in-out duration-200">
              Incio
            </p>
          </Link>
          <Link to={"/createTask"}>
            <p className="hover:text-yellow-600/60 t hover:scale-105 transition ease-in-out duration-200">
              Crear Tarea
            </p>
          </Link>
          <Link to={"/chatFeed"}>
            <p className="hover:text-yellow-600/60 t hover:scale-105 transition ease-in-out duration-200">
              Chat
            </p>
          </Link>
          <Popover content={content} trigger="click">
            {configuration?.user_image === "" ? (
              <img
                src="/assets/icons/profile.svg"
                alt="ver información del perfil"
                className="cursor-pointer size- rounded-full"
              />
            ) : (
              <img
                src={`${backendImageEndpoint}/${configuration?.user_image}`}
                alt="ver información del perfil"
                className="cursor-pointer size- rounded-full size-10"
              />
            )}
          </Popover>
        </div>
      </div>
    </div>
  );
};
