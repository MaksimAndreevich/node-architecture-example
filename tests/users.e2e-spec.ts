import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('Users e2e', () => {
	it('Register error', async () => {
		const res = await request(application.app).post('/users/register').send({
			email: 'a@a.ru',
			name: 'Maks',
			password: '1234',
		});

		expect(res.statusCode).toBe(422);
	});

	it('Login error', async () => {
		const res = await request(application.app).post('/users/login').send({
			email: 'a@a.ru',
			password: 'no valid password',
		});

		expect(res.statusCode).toBe(422);
	});

	it('Login seccess', async () => {
		const res = await request(application.app).post('/users/login').send({
			email: 'a@a.ru',
			password: '1234',
		});

		expect(res.body.jwt).not.toBeUndefined();
	});

	it('Info error', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send({ email: 'a@a.ru', password: '1234' });

		const res = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer _uncorrectjwt_`);

		expect(res.statusCode).toBe(401);
	});

	it('Info success', async () => {
		const login = await request(application.app)
			.post('/users/login')
			.send({ email: 'a@a.ru', password: '1234' });

		const res = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer ${login.body.jwt}`);

		expect(res.body.id).toBe(login.body.id);
	});
});

afterAll(() => {
	application.close();
});
