import anyTest, {TestInterface} from 'ava';
import got from 'got';

import FastifyServer from '../../server/fastify';
import Routes from '../../api';

const test = anyTest as TestInterface<{server: ReturnType<typeof FastifyServer>, address: string}>;

test.before(async t => {
  t.context.server = FastifyServer(Routes);
  t.context.address = await t.context.server.listen(44210, '0.0.0.0');
})

test.after.always(t => {
  t.context.server.server.close();
})

test.serial('successfully starts the server with the checkout route', async t => {
  const address = t.context.address;
  const response = await got.post(`${address}/checkout`, {json: ["001"]});

  t.is(response.headers['content-type'], 'application/json; charset=utf-8')

  const result = JSON.parse(response.body) as {price: number}

  t.is(result.price, 100);

  await t.throwsAsync(got.post(`${address}/checkout`, {json: {}}), {message: 'Response code 400 (Bad Request)'})
})
