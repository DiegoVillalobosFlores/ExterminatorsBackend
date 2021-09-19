import Discounts from "../services/discounts/service";
import Route from "../types/route";
import DiscountsMock from "../mock/discountsDB";
import Products from "../services/products/service";
import ProductsMock from "../mock/productsDB";

export default function Checkout() {
  const discounts = Discounts(DiscountsMock);
  const products = Products(ProductsMock);

  const routes: Array<Route> = [
    [
      'post',
      '/checkout',
      async (request) =>
      {
        const items = request.body.reduce(
          (acc: Record<string, number>, productId: string) =>
            ({...acc, [productId]: acc[productId] ? acc[productId] + 1 : 1}), {}
        );

        let total = 0;
        for(const item of Object.entries(items)) {
          const [productId, amount] = item;
          const parsedAmount = parseInt(amount as string, 10);
          const discount = await discounts.applyDiscount(productId, parsedAmount);
          const product = await products.get({id: productId});

          total = total + (product.price * parsedAmount) + discount;
        }

        return {price: total};
      }
    ]
  ]

  return routes;
}