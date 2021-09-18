import {Product} from "../types";

export default function ProductsMock() {
  const products: Record<string, Product> = {
    '001': {
      id: '001',
      name: 'Rolex',
      price: 100,
    },
    '002': {
      id: '002',
      name: 'Michael Kors',
      price: 80,
    },
    '003': {
      id: '002',
      name: 'Swatch',
      price: 100,
    },
    '004': {
      id: '004',
      name: 'Casio',
      price: 100,
    }
  };

  return {
    add: async (data: Product) => {
      if(products[data.id]) return null;
      products[data.id] = data;

      return true
    },
    get: async (id: string) => {
      if(!products[id]) return null;
      return products[id]
    }
  }
}