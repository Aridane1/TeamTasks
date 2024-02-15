import deviceService from "./src/services/DeviceService";

if ("serviceWorker" in navigator) {
  const register = await navigator.serviceWorker.register("/serviceWorker.js", {
    scope: "/",
  });
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY,
  });

  // deviceService.postDevice(subscription);
}
