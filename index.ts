import FastifyServer from './src/server/fastify';
import Routes from './src/api'

const server = FastifyServer(Routes,true);

(async () => {
  try {
    await server.listen(process.env.PORT || 8080, process.env.HOST || '0.0.0.0');
  } catch (e) {
    server.server.log.error(e);
    process.exit(1)
  }
})()
