const backendEnpoint = import.meta.env.VITE_BACKEND_URL;

export const webSocketEndpoint = import.meta.env.VITE_SERVER_WEBSOCKET_URL;

export const backendImageEndpoint = `${backendEnpoint}/images`;

export const backendAuthEnpoint = `${backendEnpoint}/api/user`;

export const backendTaskEnpoint = `${backendEnpoint}/api/task`;

export const backendUserTaskEnpoint = `${backendEnpoint}/api/userTask`;

export const backendDeviceEnpoint = `${backendEnpoint}/api/device`;

export const backendMessageEnpoint = `${backendEnpoint}/api/message`;
