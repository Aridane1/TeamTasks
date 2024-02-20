// import deviceService from "../frontend/src/services/DeviceService";

// if ("serviceWorker" in navigator) {
//   const register = await navigator.serviceWorker.register("/serviceWorker.js", {
//     scope: "/",
//   });
//   const subscription = await register.pushManager.subscribe({
//     userVisibleOnly: true,
//     applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY,
//   });

//   // deviceService.postDevice(subscription);
// }
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/serviceWorker.js", { type: "module" })
      .then(
        function (registration) {
          console.log(
            "Service worker registered! with scope: ",
            registration.scope
          );
        },
        function (err) {
          console.log("serviceWorker registration failed: ", err);
        }
      );
  });
}
