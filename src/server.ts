import fastify from 'fastify';

const server = fastify({logger: true});

const start = async () => {
  try {
    await server.listen(8080);
  } catch (e) {
    console.error(e);
  }
};

start();
