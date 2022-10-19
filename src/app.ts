import express, { Express } from "express";
import { Server } from "http";
import { LoggerService } from "./logger/logger.service";
import { userRouter } from "./users/users";
import { UsersController } from "./users/users.controller";

export class App {
  app: Express;
  port: number;
  server: Server;
  logger: LoggerService;
  usersController: UsersController;

  constructor(logger: LoggerService, usersController: UsersController) {
    this.app = express();
    this.port = 8000;
    this.logger = logger;
    this.usersController = usersController;
  }

  useRoutes() {
    this.app.use("/users", this.usersController.router);
  }

  public async init() {
    this.server = this.app.listen(this.port, () =>
      this.logger.log(`Server is work on http://localhost:${this.port} ...`)
    );
    this.useRoutes();
  }
}
