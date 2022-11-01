import { NextFunction, Response, Request } from 'express';
import { IMiddleware } from './middleware.interface';
import { validate } from 'class-validator';
import { ClassConstructor, plainToClass } from 'class-transformer';

export class ValidateMiddleware implements IMiddleware {
	constructor(private classToValidate: ClassConstructor<object>) {}

	execute({ body }: Request, res: Response, next: NextFunction): void {
		const instance = plainToClass(this.classToValidate, body);

		validate(instance).then((errors) => {
			if (errors.length > 0) {
				res.status(422).send(errors);
			} else {
				next();
			}
		});
	}
}
