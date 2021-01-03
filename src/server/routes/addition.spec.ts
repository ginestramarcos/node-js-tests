import {app} from '../app';
import supertest from 'supertest';

const request = supertest(app);

it('basic users request ajax add', async (done) => {
  const response = await request.get('/addition?a=1&b=2&op=add');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
  done();
});

it('basic users request ajax subtract', async (done) => {
  const response = await request.get('/addition?a=3&b=2&op=subtract');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
  done();
});
