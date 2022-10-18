import express, { Express } from "express";
import { Server } from "http";
import { userRouter } from "./users/users";

export class App {
  app: Express;
  port: number;
  server: Server;

  constructor() {
    this.app = express();
    this.port = 8000;
  }

  useRoute() {
    this.app.use("/users", userRouter);
  }

  public async init() {
    this.server = this.app.listen(this.port, () =>
    //TODO: add logger instesd console.log
      console.log(`Server is work on http://localhost:${this.port}`)
    );
  }
}
