import {app} from '../app';
import supertest from 'supertest';

const request = supertest(app);

it('basic users request ajax', async (done) => {
  const response = await request.get('/addition?a=1&b=2');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
  done();
});
