const supertest = require('supertest');

const app = require('../../app');

describe('GET /api/v1/programs',()=>{
    it('should respond with an array of programs', async () => {
        const response = await supertest(app)
            .get('/api/v1/programs')
            .expect('Content-Type',/json/)
            .expect(200);

        // expect(response.body).toEqual([]);
        expect(response.body).toBeGreaterThan(0);
    });

    it('should respond with an individual program', async () => {
        const response = await supertest(app)
            .get('/api/v1/programs/1')
            .expect('Content-Type',/json/)
            .expect(200);

        expect(response.body.id).toBe(1);
    });

    it('should respond with a 404 for not found program', async () => {
        const response = await supertest(app)
            .get('/api/v1/programs/98712')
            .expect('Content-Type',/json/)
            .expect(404);

    });

});

