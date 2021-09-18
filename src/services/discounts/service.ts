import Api from "./api";

export default function Discounts(dbClient: any) {
  const dbInstance = dbClient();
  const api = Api(dbInstance);

  return {
    add: api.addDiscount,
    applyDiscount: api.applyDiscount
  }
}
