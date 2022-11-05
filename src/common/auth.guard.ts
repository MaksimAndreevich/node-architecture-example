import { NextFunction, Request, Response } from 'express';
import { HTTPError } from '../errors/htpp-error.class';
import { IMiddleware } from './middleware.interface';

export class AuthGuard implements IMiddleware {
	execute(req: Request, res: Response, next: NextFunction): void | null {
		if (req.user) return next();
		next(new HTTPError(401, 'The user is not logged in'));
	}
}
