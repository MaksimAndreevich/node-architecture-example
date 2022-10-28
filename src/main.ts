import { Container, ContainerModule, interfaces } from "inversify";
import { App } from "./app";
import { ExeptionFilter } from "./errors/exeption.filter";
import { IExeptionFilter } from "./errors/exeption.filter.interface";
import { ILogger } from "./logger/logger.interface";
import { LoggerService } from "./logger/logger.service";
import { TYPES } from "./types";
import { UsersController } from "./users/users.controller";
import "reflect-metadata";
import { IUsersController } from "./users/users.contoller.interface";

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService);
  bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
  bind<IUsersController>(TYPES.UserController).to(UsersController);
  bind<App>(TYPES.Application).to(App);
});

function bootstrap() {
  const container = new Container();
  container.load(appBindings);
  const app = container.get<App>(TYPES.Application);
  app.init();
  return { container, app };
}

export const { app, container } = bootstrap();
