import {app} from '../app';
import supertest from 'supertest';

const request = supertest(app);

it('not found delegated to client', async (done) => {
  const response = await request.get('/blahblah');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
  done();
});
