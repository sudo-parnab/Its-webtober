const request = require('supertest');

const app = require('../../app');
const User = require('../../models/users.model');
const { mongooseConnect, mongooseDisconnect } = require('../../config/mongoose');

describe('User Routes Endpoints', () => {
    let authToken;
    let user;

    beforeAll(async () => {
        await mongooseConnect()

        user = await User.create({
            username: 'testadmin',
            email: 'testuser@example.com',
            password: 'password'
        });

        const login = await request(app)
            .post('/v1/auth/login')
            .send({ email: 'testuser@example.com', password: 'password' });
            
        authToken = login.body.accessToken;
    });

    afterAll(async () => {
        await User.deleteMany({});

        await mongooseDisconnect();
    });

    describe('GET /v1/users', () => {
        it('should return an object of users', async () => {
            const response = await request(app).get('/v1/users');
            expect(response.status).toBe(200);
            expect(typeof response.body.users).toBe('object');
        });
    });

    describe('GET /v1/users/:id', () => {
        it('should require authentication', async () => {
            const response = await request(app).get('/v1/users/1');

            expect(response.status).toBe(401);
            expect(response.body.success).toBe(false);
        });

        it('should require valid Id', async () => {
            const response = await request(app)
                .get('/v1/users/1')
                .set('Authorization', `Bearer ${authToken}`);
            
            expect(response.status).toBe(400);
            expect(response.body.success).toBe(false);
        });

        it('should return a user by ID when authenticated', async () => {
            const response = await request(app)
                .get(`/v1/users/${user._id}`)
                .set('Authorization', `Bearer ${authToken}`)
            
            expect(response.status).toBe(200);
            expect(typeof response.body.user).toBe('object');
        });
    });

    describe('PUT /v1/users', () => {
        it('should require authentication', async () => {
            const response = await request(app).put('/v1/users');
            expect(response.status).toBe(401);
            expect(response.body.success).toBe(false);
        });

        it('should update a user', async () => {
            const response = await request(app)
                .put('/v1/users')
                .set('Authorization', `Bearer ${authToken}`)
                .send({ username: 'testuser' });

            expect(response.status).toBe(200);
            expect(response.body.message).toBeDefined();
           
        });
    })

    describe('DELETE /v1/users', () => {
        it('should require authentication', async () => {
            const response = await request(app).delete('/v1/users');
            expect(response.status).toBe(401);
            expect(response.body.success).toBe(false);
        });

        it('should delete a user', async () => {
            const response = await request(app)
                .delete('/v1/users')
                .set('Authorization', `Bearer ${authToken}`);
            
            expect(response.status).toBe(200);
            expect(response.body.message).toBeDefined();
        });
    });
});