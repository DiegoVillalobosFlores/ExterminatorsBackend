import {Product} from "../../types";

export default function Api(dbInstance: any) {
  return {
    add: async (product: Product) => {
      const result = await dbInstance.add(product);
      if(!result) throw new Error('Unable to add product')
      
      return product;
    },
    get: async ({id}: Pick<Product, 'id'>) => {
      const result = await dbInstance.get(id)

      if(!result) throw new Error(`Unable to get product with public id, ${id}`)

      return result
    }
  }
}
