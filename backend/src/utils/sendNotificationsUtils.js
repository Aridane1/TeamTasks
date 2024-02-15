import Task from "../models/task.model";
import UserTask from "../models/userTask.model";
import Device from "../models/device.model";
import webpush from "web-push";

export const notifyDeadlineApproaching = async (currentDay) => {
  try {
    let tasksTimeLimit = await Task.find();

    tasksTimeLimit.forEach(async (task) => {
      const daysRemaining = calculateDaysRemaining(currentDay, task.limit_day);
      let message = `Te quedan ${daysRemaining} ${
        daysRemaining == 1 ? "día" : "días"
      } para terminar la tarea "${task.title}"`;
      if (daysRemaining <= 3) {
        let taskId = task._id;
        let usersToNotify = await UserTask.find(
          { task_id: taskId },
          { _id: 0, user_id: 1 }
        );
        usersToNotify.forEach(async (user) => {
          let userDevices = await getAllDeviceForUserId(user.user_id);
          userDevices.forEach(async (device) => {
            sendNotificationToUser(
              task.title,
              message,
              device.endpoint,
              device.keys
            );
          });
        });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Hubo algun error");
  }
};

const calculateDaysRemaining = (currentDay, limitDay) => {
  const [day, month, year] = limitDay.split("-");
  const deadlineDate = new Date(`${year}-${month}-${day}`);

  const timeDifference = deadlineDate.getTime() - currentDay.getTime();

  const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysRemaining;
};

const getAllDeviceForUserId = async (user) => {
  try {
    let userDevices = await Device.find({ user_id: user });
    return userDevices;
  } catch (err) {
    console.log(err);
  }
};

const sendNotificationToUser = async (title, message, endpoint, keys) => {
  let subscriptionUser = {
    endpoint: endpoint,
    keys: keys,
  };

  let payload = {
    title: title,
    body: message,
  };
  return webpush.sendNotification(subscriptionUser, JSON.stringify(payload));
};
