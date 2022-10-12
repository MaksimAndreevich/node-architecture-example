import express, { Request, Response, NextFunction } from "express";
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

const callback = (req: Request, res: Response, next: NextFunction) => {
  console.log("Wokr callback");
  next();
};

app.get("/hello", [
  callback,
  //   callback,
  //   callback,
  (req: Request, res: Response) => {
    res.send("Hello World!");
  },
]);

app.get("/redirect", (req, res) => {
  res.redirect(301, "https://yandex.ru");
});

app.use((err: Error, req: Request, res: Response) => {
  console.log(err.message);
  res.status(401).send(err.message);
});

app.listen(port, () =>
  console.log(`Server is work on http://localhost:${port}`)
);
