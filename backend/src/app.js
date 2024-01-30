const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

let corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(morgan("dev"));

export default app;
