const express = require('express');

const server = express();
const helmet = require("helmet");
const cors = require("cors")
//const morgan = require("morgan");
const userRouter = require("./users/userRouter");
// const postRouter = require("./posts/postRouter");

server.use(express.json());
//server.use(morgan("dev"));
server.use(cors());
server.use(helmet());
server.use(logger);
server.use(addName);

server.use("/users", userRouter);
// server.use("/posts", postRouter);

server.get("/", function (req, res) {
  res.send(`welcome to lambo bambo ${req.name}`);
});

//custom middleware

function addName(req, res, next) {
  if (!req.name) {
    req.name = req.headers["x-name"] || "unknown user";
  }
  next();
}


function logger(req, res, next) {
  console.log("---------------------------------\n");
  console.log(req.method, " Request received---\n");
  console.log("At URL: ", req.url, "\n");
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const currDate = new Date();
  console.log(currDate.toLocaleDateString("en-US", options));
  console.log("---------------------------------\n");
  next();
}

server.use((error, req, res, next) => {
  //other things, try to fix error and then next(), or log it, whatever
  res.status(error.status).json(error);
  
})

module.exports = server;
