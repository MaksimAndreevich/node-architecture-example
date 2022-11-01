import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';

@injectable()
export class UserService implements IUserService {
	constructor(@inject(TYPES.ConfigService) private config: IConfigService) {}

	async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);
		const salt = this.config.get('SALT');

		await newUser.setPassword(password, Number(salt));
		// проверка что он есть
		// если есть return null, если нет создаем

		return newUser;
	}
	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
