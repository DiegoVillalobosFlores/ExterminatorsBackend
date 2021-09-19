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
    ]}, {})

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
    ]}, {})

  t.is(rolexDiscountResult.price, 400)
})

test.serial('calculates the correct total with discounts for item 002', async t => {
  const checkout = t.context.checkout;

  const route = checkout[0];

  const corsDiscountResult = await route[2]({body: [
      "002",
      "002",
      "002",
      "002",
      "002"
    ]}, {})

  t.is(corsDiscountResult.price, 320)
})

test.serial('throws a 400 when a product does not exist', async t => {
  const checkout = t.context.checkout;

  const route = checkout[0];

  let statusCode;

  await t.throwsAsync(route[2]({body: [
      "invalid",
    ]},
    {status: (code: number) => statusCode = code}),
    {message: 'Unable to get product with public id, invalid'})

  t.is(statusCode, 400);

  statusCode = null;

  await t.throwsAsync(route[2]({body: [
      "001",
      "invalid2",
    ]},
    {status: (code: number) => statusCode = code}),
    {message: 'Unable to get product with public id, invalid2'})

  t.is(statusCode, 400);
})

test.serial('throws an error when the body is malformed', async t => {
  const checkout = t.context.checkout;

  const route = checkout[0];

  let statusCode;

  await t.throwsAsync(route[2]({body: {test: 'null'}},
      {status: (code: number) => statusCode = code}),
    {message: 'Body must be of type array of strings'})

  t.is(statusCode, 400);

  statusCode = null;

  await t.throwsAsync(route[2]({body: [1,2,3]},
      {status: (code: number) => statusCode = code}),
    {message: 'Body must be of type array of strings'})

  t.is(statusCode, 400)
})
