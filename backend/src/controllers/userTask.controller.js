import UserTask from "../models/userTask.model";
import User from "../models/user.model";

export const addUserTask = async (req, res) => {
  try {
    let userTask = UserTask(req.body);
    await userTask.save();
    res.send({ message: userTask });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error la tarea del usuario",
    });
  }
};

export const getOneUserTask = async (req, res) => {
  try {
    let { id } = req.params;
    let userTask = await UserTask.findById(id);
    if (!userTask) {
      return res
        .status(404)
        .send("No se encontró información la tarea del usuario");
    }
    return res.send(userTask);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al mostrar la tarea del usuario",
    });
  }
};

export const getAllUserTaskByUserId = async (req, res) => {
  try {
    let { userId } = req.params;
    let userTasks = await UserTask.find({ user_id: userId }).populate(
      "task_id"
    );
    let taskIds = userTasks.map((userTask) => userTask.task_id);
    taskIds = taskIds.map((task) => task.toObject({ getters: true }));

    for (const task of taskIds) {
      let taskId = task._id;
      let userTask = userTasks.find((ut) => ut.task_id._id.equals(taskId));
      if (userTask) {
        task.rol = userTask.rol;
      }
      let quantityUser = await UserTask.countDocuments({
        task_id: taskId,
      });

      task.quantityUser = quantityUser;
    }
    console.log(taskIds);

    if (!userTasks) {
      return res
        .status(404)
        .send("No se encontró información de las tareas del usuario");
    }
    return res.send(taskIds);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al mostrar la tarea del usuario",
    });
  }
};

export const getAllUserTask = async (req, res) => {
  try {
    let userTask = await UserTask.find();
    if (!userTask) {
      return res.status(404).send("No hay tareas de usuarios registradas aún.");
    }
    return res.send(userTask);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al mostrar las tareas de los usuarios",
    });
  }
};

export const getAllUserTaskCount = async (req, res) => {
  try {
    const userTasksResults = await UserTask.aggregate([
      {
        $group: {
          _id: "$user_id",
          count: { $sum: 1 },
        },
      },
    ]);

    const userIds = userTasksResults.map((result) => result._id);

    const users = await User.find({ _id: { $in: userIds } });

    const userTasks = userTasksResults.map((result) => {
      const user = users.find(
        (u) => u._id.toString() === result._id.toString()
      );
      return {
        username: user.username,
        count: result.count,
      };
    });

    console.log(userTasks);

    if (!userTasks) {
      return res.status(404).send("No hay tareas de usuarios registradas aún.");
    }
    return res.send(userTasks);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al mostrar las tareas de los usuarios",
    });
  }
};

export const deleteOneUserTask = async (req, res) => {
  try {
    let { id } = req.params;
    await UserTask.findByIdAndDelete(id);
    return res.status(200).send({
      message: "La tarea del usuario ha sido eliminada correctamente",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al eliminar la tarea del usuario",
    });
  }
};

export const putOneUserTask = async (req, res) => {
  try {
    let { id } = req.params;
    await UserTask.findByIdAndUpdate(id, req.body);
    res.status(200).send({
      message: "Tarea del usuario actualizada correctamente",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al modificar la tarea del usuario",
    });
  }
};
