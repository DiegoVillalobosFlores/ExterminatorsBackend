import Discounts from '../services/discounts/service';
import DiscountsMock from '../mock/discountsDB';
import Products from '../services/products/service';
import ProductsMock from '../mock/productsDB';
import {Route} from '../types';

export default function Checkout() {
  const discounts = Discounts(DiscountsMock);
  const products = Products(ProductsMock);

  const routes: Array<Route> = [
    [
      'post',
      '/checkout',
      async (request, response) =>
      {
        if (!Array.isArray(request.body)) {
          response.status(400);
          throw new Error('Body must be of type array of strings')
        }

        if (!request.body.every((id: any) => typeof id === 'string')) {
          response.status(400);
          throw new Error('Body must be of type array of strings')
        }

        const items = request.body.reduce(
          (acc: Record<string, number>, productId: string) =>
            ({...acc, [productId]: acc[productId] ? acc[productId] + 1 : 1}), {}
        );

        let total = 0;
        for(const item of Object.entries(items)) {
          const [productId, amount] = item;

          let product;
          try {
            product = await products.get({id: productId});
          } catch (e) {
            response.status(400);
            throw e
          }

          const parsedAmount = parseInt(amount as string, 10);
          const discount = await discounts.applyDiscount(productId, parsedAmount);

          total = total + (product.price * parsedAmount) + discount;
        }

        return {price: total};
      }
    ]
  ]

  return routes;
}
