import { Button, Popover, Switch, Upload, message } from "antd";
import { Header } from "../components/Header";
import deviceService from "../services/DeviceService";
import { decodeToken } from "../utils/shared/globalFunctions";
import { useEffect, useState } from "react";
import configurationService from "../services/ConfigurationService";
import {
  CheckOutlined,
  CloseOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { UploadChangeParam } from "antd/es/upload";
import { backendImageEndpoint } from "../constants/backendEndpoints";

export default function Setting() {
  type Configuration = {
    list_mode: boolean;
    night_mode: boolean;
    user_image: string;
  };
  const [configuration, setConfiguration] = useState<Configuration>({
    list_mode: false,
    night_mode: false,
    user_image: "",
  });

  const [image, setImage] = useState<Blob | undefined>();

  const user = decodeToken();

  const handleUploadChange = async (options: UploadChangeParam) => {
    const { file } = options;
    const imageBlob = file.originFileObj as File;
    const response = await fetch(URL.createObjectURL(imageBlob));
    const blob = await response.blob();
    setImage(blob);
  };

  const confirmChange = async () => {
    configurationService
      .putConfigurationByUserWithPhoto({
        list_mode: configuration.list_mode,
        user_id: user.id,
        night_mode: configuration.night_mode,
        user_image: image,
      })
      .then(() => {
        window.location.reload();
      });
  };

  const contentImage = (
    <>
      <p className="mb-5">Cambiar foto de perfil</p>
      <Upload listType="picture" onChange={handleUploadChange}>
        <Button className="bg-white" icon={<UploadOutlined />}>
          Upload
        </Button>
      </Upload>
      <Button
        className="bg-blue-400 mt-5"
        type="primary"
        onClick={confirmChange}
      >
        Cambiar
      </Button>
    </>
  );

  const handlePermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const register = await navigator.serviceWorker.getRegistration();
      if (register === undefined) return;

      const existingSubscription = await register.pushManager.getSubscription();

      if (existingSubscription) {
        message.info(
          "Ya estás suscrito con este dispositivo para recibir notificaciones.",
          5
        );
        return;
      }

      const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY,
      });
      deviceService.postDevice({
        subscription: subscription,
        user_id: user.id,
      });
    }
  };

  const getConfigurationUser = async () => {
    try {
      const response = await configurationService.getConfigurationByUser();
      const defaultConfiguration: Configuration = {
        list_mode: false,
        night_mode: false,
        user_image: "",
      };

      const updatedConfiguration = {
        ...defaultConfiguration,
        ...response.message,
      };
      setConfiguration(updatedConfiguration);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNightModeChange = async (checked: boolean) => {
    setConfiguration((prevConfiguration) => ({
      ...prevConfiguration,
      night_mode: checked,
    }));
    const html = document.querySelector("html");
    const body = document.querySelector("body");
    if (checked) {
      html!.classList.add("dark");
      body!.style.backgroundColor = "#3e3d3a";
    } else {
      html!.classList.remove("dark");
      body!.style.backgroundColor = "#FFF7EA";
    }
    configurationService
      .putConfigurationByUser({
        night_mode: checked,
        user_id: user.id,
        list_mode: configuration.list_mode,
      })
      .then(() => {});
  };

  const handleListModeChange = (checked: boolean) => {
    setConfiguration((prevConfiguration) => ({
      ...prevConfiguration,
      list_mode: checked,
    }));
    configurationService
      .putConfigurationByUser({
        list_mode: checked,
        user_id: user.id,
        night_mode: configuration.night_mode,
      })
      .then(() => {});
  };

  useEffect(() => {
    getConfigurationUser();
  }, []);

  return (
    <div>
      <Header />
      <div className="flex mt-10 justify-center items-center max-w-full">
        <div className="w-full flex flex-col items-center justify-center ">
          <div className="text-7xl">
            <h1>Ajustes</h1>
          </div>
          <div className="mt-12 flex flex-col gap-5">
            <Popover content={contentImage} trigger="click">
              <img
                className="rounded-full size-52 object-cover"
                src={
                  configuration.user_image === ""
                    ? "/assets/icons/profile.svg"
                    : `${backendImageEndpoint}/${configuration.user_image}`
                }
              />
            </Popover>
            <div className="flex gap-5">
              <p>Modo oscuro:</p>
              <Switch
                checked={configuration?.night_mode}
                onChange={handleNightModeChange}
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                className="bg-gray-400"
              />
            </div>
            <div className="flex gap-5">
              <p>Modo lista:</p>
              <Switch
                checked={configuration?.list_mode}
                onChange={handleListModeChange}
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                className="bg-gray-400"
              />
            </div>
            <Button
              onClick={handlePermission}
              type="primary"
              className="bg-blue-400"
            >
              Permitir notificaciones
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
