import {app} from '../app';
import supertest from 'supertest';

const request = supertest(app);

it('landing no name param', async (done) => {
  const response = await request.get('/templatized');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
  done();
});

it('landing with name param', async (done) => {
  const response = await request.get('/templatized?name=John');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
  done();
});


