import express from "express";
import { userRouter } from "./users/users.js";

const port = 8000;
const app = express();

app.use((req, res, next) => {
  console.log(`Time ${Date.now()}`);
  next();
});

app.all("/hello", (req, res, next) => {
  console.log("Work app.all");
  next();
});

app.use("/users", userRouter);

const callback = (req, res, next) => {
  console.log("Wokr callback");
  next();
};

app.get("/hello", [
  callback,
  //   callback,
  //   callback,
  (req, res) => {
    res.send("Hello World!");
  },
]);

app.get("/redirect", (req, res) => {
  res.redirect(301, "https://yandex.ru");
});

app.listen(port, () =>
  console.log(`Server is work on http://localhost:${port}`)
);
