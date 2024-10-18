const request = require('supertest');

const app = require('../../app');
const User = require('../../models/users.model');
const TokenBlacklist = require('../../models/tokenblacklist.model');
const { mongooseConnect, mongooseDisconnect } = require('../../config/mongoose');

describe('Authentication Endpoints', () => {
    beforeAll(async () => {
        await mongooseConnect();
    });

    afterAll(async () => {
        await TokenBlacklist.deleteMany({});
        await User.deleteMany({});
        await mongooseDisconnect();
    });

    describe('POST /v1/auth/register', () => {
        it('should register a new user', async () => {
            const response = await request(app)
                .post('/v1/auth/register')
                .send({
                    username: 'testuser',
                    email: 'testuser@example.com',
                    password: 'password',
                });

            expect(response.status).toBe(201);
            expect(response.body.message).toBeDefined();
        });

        it('should hash password before saving', async () => {
            const user = await User.findOne({ email: 'testuser@example.com' });

            expect(user.password).not.toBe('password');
        });

        it('should throw validation errors if required fields are missing', async () => {
            const response = await request(app)
                .post('/v1/auth/register')
                .send({});

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });

        it('should throw validation errors if email is invalid', async () => {
            const response = await request(app)
                .post('/v1/auth/register')
                .send({
                    username: 'testuser',
                    email: 'invalidemail',
                    password: 'password',
                });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });

        it('should throw validation errors if email is not unique', async () => {
            const response = await request(app)
                .post('/v1/auth/register')
                .send({
                    username: 'newuser',
                    email: 'testuser@example.com',
                    password: 'password',
                });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });

        it('should throw validation errors if username is not unique', async () => {
            const response = await request(app)
                .post('/v1/auth/register')
                .send({
                    username: 'testuser',
                    email: 'newuser@example.com',
                    password: 'password',
                });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });

        it('should throw validation errors if password is short', async () => {
            const response = await request(app)
                .post('/v1/auth/register')
                .send({
                    username: 'newuser',
                    email: 'newuser@example.com',
                    password: 'short',
                });

            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });
    });

    describe('POST /v1/auth/login', () => {
        it('should login user with correct credentials and return an accesstoken', async () => {
            const response = await request(app)
                .post('/v1/auth/login')
                .send({ email: 'testuser@example.com', password: 'password' });

            expect(response.status).toEqual(200);
            expect(response.body.accessToken).toBeDefined();
        });

        it('should return unauthorized if email is incorrect', async () => {
            const response = await request(app)
                .post('/v1/auth/login')
                .send({
                    email: 'wrongemail@gmail.com',
                    password: 'password',
                });

            expect(response.status).toBe(401);
            expect(response.body.success).toBe(false);
        });

        it('should return unauthorized if username is incorrect', async () => {
            const response = await request(app)
                .post('/v1/auth/login')
                .send({
                    username: 'wrongusername',
                    password: 'password',
                });

            expect(response.status).toBe(401);
            expect(response.body.success).toBe(false);
        });

        it('should return unauthorized if password is incorrect', async () => {
            const response = await request(app)
                .post('/v1/auth/login')
                .send({
                    username: 'testuser',
                    password: 'wrongpassword',
                });

            expect(response.status).toBe(401);
            expect(response.body.success).toBe(false);
        });
    });

    describe('GET /v1/auth/logout', () => {
        it('should blacklist the auth token for the current user', async () => {
            const response = await request(app)
                .post('/v1/auth/login')
                .send({ email: 'testuser@example.com', password: 'password' });

            const authToken = response.body.accessToken;

            const res = await request(app)
                .get('/v1/auth/logout')
                .set('Authorization', `Bearer ${authToken}`);

            expect(res.status).toEqual(200);
            expect(res.body.message).toEqual('Logout successful');

            const tokenblacklisted = await TokenBlacklist.findOne({ token: authToken });
            expect(tokenblacklisted.token).toBe(authToken);
        });

        it('should return an error if no auth token is provided', async () => {
            const response = await request(app).get('/v1/auth/logout');
            expect(response.status).toBe(401);
            expect(response.body.success).toBe(false);
        });
    });
});