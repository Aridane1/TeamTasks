import { Button } from "antd";
import { Header } from "../components/Header";
import deviceService from "../services/DeviceService";
import { decodeToken } from "../utils/shared/globalFunctions";

export default function Setting() {
  const user = decodeToken();
  const handlePermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const register = await navigator.serviceWorker.getRegistration();
      if (register === undefined) return;

      const existingSubscription = await register.pushManager.getSubscription();

      if (existingSubscription) {
        console.log("Ya estás suscrito para recibir notificaciones push.");
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

  return (
    <div>
      <Header />
      <div className="">
        <div className="text-7xl">Ajustes</div>
        <Button onClick={handlePermission} type="primary">
          Permitir notificaciones
        </Button>
      </div>
    </div>
  );
}
