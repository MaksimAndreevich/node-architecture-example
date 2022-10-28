import express, { Express } from "express";
import { Server } from "http";
import { injectable, inject } from "inversify";
import { IExeptionFilter } from "./errors/exeption.filter.interface";
import { ILogger } from "./logger/logger.interface";
import { TYPES } from "./types";
import { UsersController } from "./users/users.controller";
import 'reflect-metadata'


@injectable()
export class App {
  app: Express;
  port: number;
  server: Server;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.UserController) private usersController: UsersController,
    @inject(TYPES.ExeptionFilter) private exeptionFilter: IExeptionFilter
  ) {
    this.app = express();
    this.port = 8000;
  }

  useRoutes() {
    this.app.use("/users", this.usersController.router);
  }

  useExeptionFilter() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  public async init() {
    this.useRoutes();
    this.useExeptionFilter();
    this.server = this.app.listen(this.port, () =>
      this.logger.log(`Server is work on http://localhost:${this.port} ...`)
    );
  }
}
