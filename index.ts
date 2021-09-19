import FastifyServer from './src/server/fastify';
import Routes from './src/api'

const server = FastifyServer(Routes,true);

server.listen(8080);
