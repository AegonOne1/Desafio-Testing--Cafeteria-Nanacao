import request from 'supertest';
import app from '../index.js';

describe("Operaciones CRUD de cafes", () => {


    // prueba para ruta GET
    it('should return a status code 200 and an array with at least 1 object', async () =>{
        const resp = await request(app).get('/cafes');
        expect(resp.status).toBe(200);
        expect(Array.isArray(resp.body)).toBe(true);
        expect(resp.body.length).toBeGreaterThan(0);
    });

    //Prueba para ruta POST
    it('should add a new coffee and return a code 201', async() =>{
        const newCafe = { id: 'Cafe Prueba', nombre: 'Espresso'};
        const resp = await request(app)
            .post('/cafes')
            .send(newCafe)
            .set('Accept', 'application/json');
        expect(resp.status).toBe(201);
        expect(resp.body).toEqual(expect.arrayContaining([expect.objectContaining(newCafe)]));
    });

    //Prueba para ruta DELETE
    it('should return a 404 code when trying to delete a coffee with an id that does not exist', async() =>{
        const resp = await request(app)
            .delete('/cafes/9999')
            .set('Authorization', "jwt")
        expect(resp.status).toBe(404);
    });

    // Prueba para ruta PUT
    it('should return a status code 400 if the parameter id is different from the payload id', async() =>{
        const cafeActualizado = {id: 2, nombre: 'cafe Actualizado'};
        const resp = await request(app)
            .put('/cafes/1')
            .send(cafeActualizado)
            .set('Accept', 'application/json');
        expect(resp.status).toBe(400);
    });
});
