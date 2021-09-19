import fastify from 'fastify';
import Route from '../types/route';

export default function FastifyServer(routes: Array<Route>, logger: boolean = false){
  const server = fastify({logger});

  routes.forEach(([method, route, callback]) => server[method](route, callback));

  return {
    server,
    listen: (port: number) => server.listen(port)
  }
};
