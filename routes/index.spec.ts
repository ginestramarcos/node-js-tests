import {app} from '../app';
import supertest from 'supertest';

const request = supertest(app);

it('Testing to see if Jest works', () => {
  expect(1).toBe(1);
});

it('landing no name param', async (done) => {
  const response = await request.get('/');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
  done();
});

it('landing with name param', async (done) => {
  const response = await request.get('/?name=John');
  expect(response.status).toBe(200);
  expect(response.text).toMatchSnapshot();
  done();
});


