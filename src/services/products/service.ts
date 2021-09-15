import Api from './api';

export default function () {
  const api = Api();
  return {
    addProduct: api.add,
    getProduct: api.get
  }
}