import request from 'supertest';
import { app } from '../index.js';

describe("Operaciones CRUD de cafes", () => {

    // prueba para ruta GET
    it('should return a status code 200 and an array with at least 1 object', async () =>{
        const resp = await request(app).get('/cafes');
        expect(resp.status).toBe(200);
        expect(Array.isArray(resp.body)).toBe(true);
        expect(resp.body.length).toBeGreaterThan(0);
    });

});
