import Api from './api';

export default function Products(dbClient: any) {
  const dbInstance = dbClient();
  const api = Api(dbInstance);
  return {
    add: api.add,
    get: api.get
  }
}