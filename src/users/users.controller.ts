import { NextFunction, Response, Request } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/htpp-error.class';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';
import { IUsersController } from './users.contoller.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserService } from './user.service';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: UserService,
	) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/login', method: 'post', func: this.login },
			{ path: '/register', method: 'post', func: this.register },
			{ path: '/test-error', method: 'get', func: this.testExeptionFilter },
		]);
	}

	login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction): void {
		const { body } = req;
		this.ok(res, 'login');
	}

	async register(
		req: Request<{}, {}, UserRegisterDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const { body } = req;
		const result = await this.userService.createUser(body);

		if (!result) return next(new HTTPError(422, 'the user already exists'));
		this.ok(res, result);
	}

	testExeptionFilter(req: Request, res: Response, next: NextFunction): void {
		next(new HTTPError(400, 'Test Error'));
	}
}
