import fastify from 'fastify';
import Routes from './api';

const server = fastify({logger: true});

Routes.forEach(([method, route, callback]) => server[method](route, callback));

const start = async () => {
  try {
    await server.listen(8080);
  } catch (e) {
    console.error(e);
  }
};

start();
