import fastify from 'fastify';
import {Route} from '../types';

export default function FastifyServer(routes: Array<Route>, logger: boolean = false){
  const server = fastify({logger});

  routes.forEach(([method, route, callback]) => server[method](route, callback));

  return {
    server,
    listen: (port: string | number, host: string) => server.listen(port, host)
  }
};
