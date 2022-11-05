import { Container, ContainerModule, interfaces } from 'inversify';
import { App } from './app';
import { ExeptionFilter } from './errors/exeption.filter';
import { IExeptionFilter } from './errors/exeption.filter.interface';
import { ILogger } from './logger/logger.interface';
import { LoggerService } from './logger/logger.service';
import { TYPES } from './types';
import { UsersController } from './users/users.controller';
import 'reflect-metadata';
import { IUsersController } from './users/users.contoller.interface';
import { UserService } from './users/user.service';
import { IUserService } from './users/user.service.interface';
import { IConfigService } from './config/config.service.interface';
import { ConfigService } from './config/config.service';
import { PrismaService } from './db/prisma.service';
import { IUsersRepository } from './users/users.repository.interface';
import { UsersrRepository } from './users/users.repository';

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<IUsersController>(TYPES.UserController).to(UsersController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<IUsersRepository>(TYPES.UsersRepository).to(UsersrRepository).inSingletonScope();
	bind<App>(TYPES.Application).to(App);
});

export interface IBootstrapReturn {
	app: App;
	container: Container;
}

async function bootstrap(): Promise<IBootstrapReturn> {
	const container = new Container();
	container.load(appBindings);
	const app = container.get<App>(TYPES.Application);
	await app.init();
	return { container, app };
}

export const boot = bootstrap();
