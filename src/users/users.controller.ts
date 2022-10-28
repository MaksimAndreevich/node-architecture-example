import { NextFunction, Response, Request } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/htpp-error.class';
import { ILogger } from '../logger/logger.interface';
import { LoggerService } from '../logger/logger.service';
import { TYPES } from '../types';
import 'reflect-metadata';
import { IUsersController } from './users.contoller.interface';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/login', method: 'post', func: this.login },
			{ path: '/register', method: 'post', func: this.register },
			{ path: '/test-error', method: 'get', func: this.testExeptionFilter },
		]);
	}

	login(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, 'login');
	}

	register(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, 'register');
	}

	testExeptionFilter(req: Request, res: Response, next: NextFunction): void {
		next(new HTTPError(400, 'Test Error'));
	}
}