import {Discount, Product, Comparison} from "../../types";

const comparisons: Record<Comparison, (a: any, b: any) => boolean> = {
  equal: (a, b) => a === b,
  equalOrMore: (a,b) => a >= b
}

const triggers = {
  amount: (amount: number, condition: Discount["condition"]) => comparisons[condition.comparison](amount, condition.value)
}

const executeDiscountCondition = ({trigger, condition, difference}: Discount, amount: number) => {
  const applicable = triggers[trigger](amount, condition);

  if(!applicable) return 0;

  // How many times the discount can be applied
  // the previous 'applicable' check ensures that this will always be greater than 1
  // e.g. condition.value = 3, amount = 4, timesMet = 1.33 (1 when floored)
  const timesMet = Math.floor(amount / condition.value);

  // How many times the discount can be used based on the condition's limit
  // if the 'usageLimit' from the discount's 'condition' is lower than 'timesMet' we use that instead
  // e.g. timesMet = 3, condition.usageLimit = 2, usableTimes = 2
  // e.g. timesMet = 3, condition.usageLimit = 10, usableTimes = 3
  const usableTimes = Math.min(timesMet, condition.usageLimit);

  // We multiply the difference of the discount with our usable times
  // e.g. usableTimes = 3, difference = -100, return -300
  return usableTimes * difference
};

export default function Api(dbInstance: any) {
  return {
    addDiscount: async (discount: Discount) => {
      const result = await dbInstance.add(discount);
      if(!result) throw new Error('Unable to add product')

      return discount;
    },
    applyDiscount: async (productId: Product["id"], amount: number) => {
      const discount = await dbInstance.get(productId);

      if(!discount) return 0;

      return executeDiscountCondition(discount, amount)
    }
  }
}
