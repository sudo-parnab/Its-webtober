const request = require('supertest');

const app = require('../../app');
const Category = require('../../models/categories.model');
const User = require('../../models/users.model');
const { mongooseConnect, mongooseDisconnect } = require('../../config/mongoose');

describe('Category Routes Endpoints', () => {
    let authToken
    beforeAll(async () => {
        await mongooseConnect();

        await User.create({
            username: 'testadmin',
            email: 'testadmin@example.com',
            password: 'password',
            isAdmin: true
        });

        const login = await request(app)
            .post('/api/v1/auth/login')
            .send({ email: 'testadmin@example.com', password: 'password' });
            
        authToken = login.body.accessToken;
    });

    afterAll(async () => {
        await Category.deleteMany({});
        await User.deleteMany({});
        await mongooseDisconnect()
    });

    describe('POST /api/v1/categories', () => {
        it('should require authentication', async () => {
            const response = await request(app)
                .post('/api/v1/categories')
                        
            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Unauthorized');
        });

        it('should create a new category', async () => {
            const response = await request(app)
                .post('/api/v1/categories')
                .set('Authorization', `Bearer ${authToken}`)
                .send({ name: 'technology' });

            expect(response.status).toBe(201);
            expect(response.body.message).toBeDefined();
        });
   
        it('should throw validation errors if category is not unique', async () => {
            const response = await request(app)
                .post('/api/v1/categories')
                .set('Authorization', `Bearer ${authToken}`)
                .send({ name: 'technology' });

            expect(response.status).toBe(400);
            expect(response.error).toBeDefined();
        });

        it('should throw validation errors if category name is not provided', async () => {
            const response = await request(app)
                .post('/api/v1/categories')
                .set('Authorization', `Bearer ${authToken}`)
                .send({});

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Please provide a category name');
        });
    });

    describe('GET /api/v1/categories', () => {
        it('should require authentication', async () => {
            const response = await request(app)
                .get('/api/v1/categories')
                        
            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Unauthorized');
        });
        
        it('should return not found when a category is not created', async () => {
            await Category.deleteMany({});

            const response = await request(app)
                .get('/api/v1/categories')
                .set('Authorization', `Bearer ${authToken}`);
                        
            expect(response.status).toBe(404);
            expect(response.body.message).toBe('No categories found');
        });

        it('should return an object of categories', async () => {
            await Category.create({ name: 'news' });

            const response = await request(app)
                .get('/api/v1/categories')
                .set('Authorization', `Bearer ${authToken}`);
                        
            expect(response.status).toBe(200);
            expect(typeof response.body.categories).toBe('object');
        });
    });

    describe('GET /api/v1/categories/:id', () => {
        it('should require authentication', async () => {
            const response = await request(app).get('/api/v1/categories/1');
            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Unauthorized');
        });

        it('should require valid Id', async () => {
            const response = await request(app)
                .get('/api/v1/categories/1')
                .set('Authorization', `Bearer ${authToken}`);
            
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Invalid ID');
        });

        it('should return a not found if there is not category with Id', async () => {
            const category = await Category.findOne({ name: 'news' });

            const response = await request(app)
                .get('/api/v1/categories/6468dec66dd5df03267cdf6e')
                .set('Authorization', `Bearer ${authToken}`)
                        
            
            expect(response.status).toBe(404);
            expect(typeof response.body.message).toBeDefined();
        });

        it('should return a category by ID when authenticated', async () => {
            const category = await Category.findOne({ name: 'news' });

            const response = await request(app)
                .get(`/api/v1/categories/${category._id}`)
                .set('Authorization', `Bearer ${authToken}`)
                        
            expect(response.status).toBe(200);
            expect(typeof response.body.category).toBe('object');
        });
    });



    describe('PUT /api/v1/categories/:id', () => {
        it('should require authentication', async () => {
            const response = await request(app).put('/api/v1/categories/1');

            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Unauthorized');
        });

        it('should require valid Id', async () => {
            const response = await request(app)
                .put('/api/v1/categories/1')
                .set('Authorization', `Bearer ${authToken}`);
            
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Invalid ID');
        });

        it('should not update a category if category id not found', async () => {
            const response = await request(app)
                .put('/api/v1/categories/6468dec66dd5df03267cdf6e')
                .set('Authorization', `Bearer ${authToken}`)
                .send({ name: 'global news' });

            expect(response.status).toBe(404);
            expect(response.body.message).toBeDefined();
        });

        it('should required category name before updating a category', async () => {
            const category = await Category.findOne({ name: 'news' });

            const response = await request(app)
                .put(`/api/v1/categories/${category._id}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({});

            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Please provide a category name');
        });

        it('should update a category', async () => {
            const category = await Category.findOne({ name: 'news' });

            const response = await request(app)
                .put(`/api/v1/categories/${category._id}`)
                .set('Authorization', `Bearer ${authToken}`)
                .send({ name: 'global news' });

            expect(response.status).toBe(200);
            expect(response.body.message).toBeDefined();
        });
    });

    describe('DELETE /api/v1/categories/:id', () => {
        it('should require authentication', async () => {
            const response = await request(app).delete('/api/v1/categories/1');

            expect(response.status).toBe(401);
            expect(response.body.message).toBe('Unauthorized');
        });

        it('should require valid Id', async () => {
            const response = await request(app)
                .delete('/api/v1/categories/1')
                .set('Authorization', `Bearer ${authToken}`);
            
            expect(response.status).toBe(400);
            expect(response.body.message).toBe('Invalid ID');
        });

        it('should not delete a category if category id not found', async () => {
            const response = await request(app)
                .delete('/api/v1/categories/6468dec66dd5df03267cdf6e')
                .set('Authorization', `Bearer ${authToken}`)

            expect(response.status).toBe(404);
            expect(response.body.message).toBeDefined();
        });

        it('should delete a category', async () => {
            const category = await Category.findOne({ name: 'global news' });

            const response = await request(app)
                .delete(`/api/v1/categories/${category._id}`)
                .set('Authorization', `Bearer ${authToken}`);
            
            expect(response.status).toBe(200);
            expect(response.body.message).toBeDefined();
        });
    });
});