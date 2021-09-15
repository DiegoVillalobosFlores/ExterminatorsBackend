import {Product} from "../../types";

const db = () => {
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

export default function () {
  const dbInstance = db();

  return {
    add: async (product: Product) => {

      const result = await dbInstance.add(product);
      if(Number.isNaN(result)) throw new Error('Unable to add product')
      
      return product.id;
    },
    get: async ({id}: Pick<Product, 'id'>) => {
      const result = await dbInstance.get(id)

      if(!result) throw new Error(`Unable to get product with public id, ${id}`)

      return result
    }
  }
}
