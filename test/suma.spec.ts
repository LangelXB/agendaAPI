import request from 'supertest';
import app from '../src/config/app';

describe('welcome test', () => {
  test('api running', async () => {
    const res = await request(app).get('/').send();
    expect(res.statusCode).toBe(200);
  });
});
