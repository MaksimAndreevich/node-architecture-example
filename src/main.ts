import { Container } from "inversify";
import { App } from "./app";
import { ExeptionFilter } from "./errors/exeption.filter";
import { IExeptionFilter } from "./errors/exeption.filter.interface";
import { ILogger } from "./logger/logger.interface";
import { LoggerService } from "./logger/logger.service";
import { TYPES } from "./types";
import { UsersController } from "./users/users.controller";
import 'reflect-metadata'

const container = new Container();
container.bind<ILogger>(TYPES.ILogger).to(LoggerService);
container.bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
container.bind<UsersController>(TYPES.UserController).to(UsersController);
container.bind<App>(TYPES.Application).to(App);

const app = container.get<App>(TYPES.Application);

app.init();

export { app, container };
