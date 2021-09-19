import anyTest, {TestInterface} from 'ava';
import Checkout from "../../api/checkout";

const test = anyTest as TestInterface<{checkout: ReturnType<typeof Checkout>}>;

test.beforeEach(t => {
  t.context.checkout = Checkout();
});

test.serial('calculates the correct total based on a list of products ids', async t => {
  const checkout = t.context.checkout;

  const route = checkout[0];

  t.is(route[0], 'post');
  t.is(route[1], '/checkout');

  const result = await route[2]({body: [
      "001",
      "002",
      "001",
      "004",
      "003"
    ]})

  t.is(result.price, 360)
})

test.serial('calculates the correct total with discounts for item 001', async t => {
  const checkout = t.context.checkout;

  const route = checkout[0];

  const rolexDiscountResult = await route[2]({body: [
      "001",
      "001",
      "001",
      "001",
      "001"
    ]})

  t.is(rolexDiscountResult.price, 400)
})

test.serial('calculates the correct total with discounts for item 002', async t => {
  const checkout = t.context.checkout;

  const route = checkout[0];

  const rolexDiscountResult = await route[2]({body: [
      "002",
      "002",
      "002",
      "002",
      "002"
    ]})

  t.is(rolexDiscountResult.price, 320)
})
