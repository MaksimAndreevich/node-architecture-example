import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'The email is specified incorrectly' })
	email: string;

	@IsString({ message: 'Password not specified' })
	password: string;
}
