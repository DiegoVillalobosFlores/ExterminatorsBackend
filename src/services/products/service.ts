import Api from './api';

export default function Service(dbClient: any) {
  const dbInstance = dbClient();
  const api = Api(dbInstance);
  return {
    add: api.add,
    get: api.get
  }
}