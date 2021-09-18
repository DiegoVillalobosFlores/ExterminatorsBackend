import {Discount} from "../types";

export default function DiscountsMock() {
  const discounts: Record<string, Discount> = {
    '001': {
      id: '001',
      trigger:'amount',
      condition: {
        comparison: "equalOrMore",
        value: 3,
        usageLimit: Infinity
      },
      difference: -100,
    },
    '002': {
      id: '002',
      trigger:'amount',
      condition: {
        comparison: "equalOrMore",
        value: 2,
        usageLimit: Infinity
      },
      difference: -40,
    }
  };

  return {
    add: async (data: Discount) => {
      if(discounts[data.id]) return null;
      discounts[data.id] = data;

      return true
    },
    get: async (id: string) => {
      if(!discounts[id]) return null;
      return discounts[id]
    }
  }
}
