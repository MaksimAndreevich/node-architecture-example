import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
export class UserService implements IUserService {
	async createUser({ email, name, password }: UserRegisterDto): Promise<User | null> {
		const newUser = new User(email, name);
		await newUser.setPassword(password);
		// проверка что он есть
		// если есть return null, если нет создаем

		return newUser;
	}
	async validateUser(dto: UserLoginDto): Promise<boolean> {
		return true;
	}
}
