import anyTest, {TestInterface} from 'ava';

import Discounts from  '../../services/discounts'
import DiscountsMock from '../../mock/discountsDB'

const test = anyTest as TestInterface<{discounts: ReturnType<typeof Discounts>}>;

test.beforeEach(t => {
  t.context.discounts = Discounts(DiscountsMock);
});

test.serial('returns a zero discount when conditions are not met', async t => {
  const discounts = t.context.discounts;

  const conditionsNotMetResult = await discounts.applyDiscount("001", 1)

  t.is(conditionsNotMetResult, 0)

  const noDiscountResult = await discounts.applyDiscount('Invalid', 0);

  t.is(noDiscountResult, 0)
})

test.serial('returns a discount quantity when conditions are met', async t => {
  const discounts = t.context.discounts;

  const result = await discounts.applyDiscount("001", 3)

  t.is(result, -100)
})

test.serial('multiplies discount when a condition is met multiple times', async t => {
  const discounts = t.context.discounts;

  const onceResult = await discounts.applyDiscount("001", 4)

  t.is(onceResult, -100)

  const twiceResult = await discounts.applyDiscount("001", 6);

  t.is(twiceResult, -200);

  const onlyTwiceResult = await discounts.applyDiscount("001", 7);

  t.is(onlyTwiceResult, -200);

  const thriceResult = await discounts.applyDiscount("001", 9);

  t.is(thriceResult, -300)
})

test.serial('can handle a limit in the number of times a discount can be applied', async t => {
  const discounts = t.context.discounts;

  await discounts.add({
    id: "limited",
    difference: 10,
    trigger: "amount",
    condition: {
      comparison: "equalOrMore",
      value: 10,
      usageLimit: 2
    }
  })

  const result = await discounts.applyDiscount("limited", 100);

  t.is(result, 20)
})

test.serial('can add a new discount to be applied', async t => {
  const discounts = t.context.discounts;

  await discounts.add({
    id: "FunnyNumber",
    condition: {
      comparison: "equal",
      usageLimit: 3,
      value: 1
    },
    difference: -1,
    trigger: "amount"
  })

  const result = await discounts.applyDiscount("FunnyNumber", 1);

  t.is(result, -1)
})

test.serial('errors when trying to add a discount with an existing ID', async t => {
  const discounts = t.context.discounts;

  await t.throwsAsync(discounts.add({
    id: "001",
    condition: {
      comparison: "equal",
      usageLimit: 3,
      value: 1
    },
    difference: -1,
    trigger: "amount"
  }))
})
