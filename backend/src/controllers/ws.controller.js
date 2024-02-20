import { addMessage, getAllMessagesByTaskId } from "./comment.controller";

let wsServer = null;
let tasks = {};

const MESSAGES = {
  SEND_MESSAGES: "sendMessage",
  GET_ALL_MESSAGES: "getAllMessages",
  GET_LAST_MESSAGES: "getLastMessages",
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
          username: parseMessage.username,
        };

        addMessage(newMessage).then(() => {
          newMessage.type = "NEW_MESSAGE";
          tasks[taskId].forEach((element) => {
            element.ws.send(JSON.stringify(newMessage));
          });
        });
      }

      if (parseMessage.type === MESSAGES.GET_ALL_MESSAGES) {
        getAllMessagesByTaskId(taskId).then((data) => {
          taskRef.ws.send(
            JSON.stringify({
              type: MESSAGES.GET_ALL_MESSAGES,
              messages: JSON.stringify(data),
            })
          );
        });
      }
      console.log(parseMessage);

      if (parseMessage.type === MESSAGES.GET_LAST_MESSAGES) {
        getAllMessagesByTaskId(taskId).then((data) => {
          taskRef.ws.send(
            JSON.stringify({
              type: MESSAGES.GET_LAST_MESSAGES,
              messages: JSON.stringify(data),
            })
          );
        });
      }
    });
  });
}
