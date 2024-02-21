import User from "../models/user.model";
import Configuration from "../models/configuration.model";
import bcrypt from "bcryptjs";
import { generateToken, getCleanUser } from "../utils/jwtUtils";

export const addUser = async (req, res) => {
  console.log(req.body);
  try {
    const { username, password, email } = req.body;
    let existUser = await User.findOne({ email: email });
    if (existUser) {
      const token = generateToken(existUser);
      const userObj = getCleanUser(existUser);
      return res.status(409).json({ user: userObj, access_token: token });
    }
    let newUser = {
      username: username,
      email: email,
      password: password,
    };
    newUser.password = bcrypt.hashSync(password);
    let user = User(newUser);
    await user.save();
    const token = generateToken(user);

    let defaultConf = {
      list_mode: false,
      night_mode: false,
      user_image: "",
      user_id: user._id,
    };

    let conf = Configuration(defaultConf);
    await conf.save();

    res.status(200).send({ user: user, access_token: token });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al registrar  el usuario",
    });
  }
};

export const deleteOneUser = async (req, res) => {
  try {
    const { email } = req.params;
    await User.deleteOne({ email: email });
    res.status(200).send({ message: "Se elimino el usuario correctamente" });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al eliminar  el usuario",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    console.log(users);
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al mostrar los usuario",
    });
  }
};

export const putUser = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOneAndUpdate({ email: email }, req.body);
    res.status(200).send(user);
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: "Hubo un error al mostrar los usuario",
    });
  }
};
