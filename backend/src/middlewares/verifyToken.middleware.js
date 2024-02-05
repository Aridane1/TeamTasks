import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envConfig";

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) return next();

  if (req.headers.authorization.indexOf("Basic ") === 0) {
    handleBasicAuth(req, next);
  } else {
    handleBearerToken(req, res, next, token);
  }
};

const handleBasicAuth = (req, next) => {
  const base64Credentials = req.headers.authorization.split(" ")[1];
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "ascii"
  );

  const [email, password] = credentials.split(":");
  req.body.email = email;
  req.body.password = password;

  next();
};

const handleBearerToken = (req, res, next, token) => {
  token = token.replace("Bearer ", "");
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        error: true,
        message: "Usuario no válido.",
      });
    } else {
      req.user = user;
      req.token = token;
      next();
    }
  });
};

export default verifyToken;
