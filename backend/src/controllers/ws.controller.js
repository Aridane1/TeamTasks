import { addMessage } from "./comment.controller";

let wsServer = null;
let tasks = {};

const MESSAGES = {
  SEND_MESSAGES: "sendMessage",
};

export function startWs(wss) {
  wsServer = wss;
  wsServer.on("connection", (ws, incoming_request) => {
    const url = new URLSearchParams(incoming_request.url);

    const taskId = url.get("task_id");
    const userId = url.get("user_id");

    if (!tasks[taskId]) {
      tasks[taskId] = [];
    }
    const taskRef = { ws, taskId, userId };

    tasks[taskId].push(taskRef);

    ws.on("message", (message) => {
      const parseMessage = JSON.parse(message);
      if (parseMessage.type === MESSAGES.SEND_MESSAGES) {
        let newMessage = {
          task_id: taskRef.taskId,
          user_id: taskRef.userId,
          message: parseMessage.message,
        };

        addMessage(newMessage).then(() => {
          newMessage.type = "NEW_MESSAGE";
          sendMessage(newMessage, taskRef.taskId);
        });
      }
    });
  });
}

const sendMessage = (message, taskId) => {
  if (tasks[taskId]) {
    tasks[taskId].forEach((element) => {
      element.ws.send(JSON.stringify(message));
    });
  }
};
