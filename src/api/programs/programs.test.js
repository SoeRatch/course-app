const supertest = require('supertest');

const app = require('../../app');

describe('GET /api/v1/programs',()=>{
    it('should respond with an array of programs', async () => {
        const response = await supertest(app)
            .get('/api/v1/programs')
            .expect('Content-Type',/json/)
            .expect(200);

        expect(response.body).toEqual([]);
    });

});

