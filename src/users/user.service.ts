import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './user.service.interface';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.service.interface';
import { IUsersRepository } from './users.repository.interface';
import { UserModel } from '@prisma/client';
import { hash } from 'bcryptjs';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private config: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
	) {}

	async createUser({ email, name, password }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, name);
		const salt = this.config.get('SALT');
		await newUser.setPassword(password, Number(salt));

		const existed = await this.usersRepository.find(email);
		if (existed) return null;

		return this.usersRepository.create(newUser);
	}

	async validateUser({ email, password }: UserLoginDto): Promise<boolean> {
		const existedUser = await this.usersRepository.find(email);
		if (!existedUser) return false;
		const newUser = new User(existedUser?.email, existedUser?.name);
		return await newUser.validatePassword(password, existedUser.password);
	}

	async getUserInfo(email: string): Promise<UserModel | null> {
		return this.usersRepository.find(email);
	}
}
