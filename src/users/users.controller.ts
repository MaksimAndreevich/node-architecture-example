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
import { ValidateMiddleware } from '../common/validate.middleware';
import { sign } from 'jsonwebtoken';
import { IConfigService } from '../config/config.service.interface';
import { IUserService } from './user.service.interface';

@injectable()
export class UsersController extends BaseController implements IUsersController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: IUserService,
		@inject(TYPES.ConfigService) private configService: IConfigService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: '/login',
				method: 'post',
				func: this.login,
				middlewares: [new ValidateMiddleware(UserLoginDto)],
			},
			{
				path: '/register',
				method: 'post',
				func: this.register,
				middlewares: [new ValidateMiddleware(UserRegisterDto)],
			},
			{
				path: '/info',
				method: 'get',
				func: this.info,
			},
			{
				path: '/test-error',
				method: 'get',
				func: this.testExeptionFilter,
			},
		]);
	}

	async login(
		req: Request<{}, {}, UserLoginDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const { body } = req;

		const result = await this.userService.validateUser(body);
		if (!result) return next(new HTTPError(422, 'incorrect password'));

		const secret = this.configService.get('SECRET');
		const jwt = await this.signJWT(body.email, secret);

		this.ok(res, { jwt });
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

	async info(req: Request, res: Response, next: NextFunction): Promise<void> {
		const { user } = req;
		this.ok(res, { email: user });
	}

	testExeptionFilter(req: Request, res: Response, next: NextFunction): void {
		next(new HTTPError(400, 'Test Error'));
	}

	private async signJWT(email: string, secret: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			sign(
				{
					email,
					iat: Math.floor(Date.now()) / 1000,
				},
				secret,
				{
					algorithm: 'HS256',
				},
				(err, token) => {
					if (err) {
						reject(err);
					}
					resolve(token as string);
				},
			);
		});
	}
}
