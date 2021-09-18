import anyTest, {TestInterface} from 'ava';

import Products from '../../services/products'
import ProductsMock from '../../mock/productsDB';

const test = anyTest as TestInterface<{products: ReturnType<typeof Products>}>;

test.beforeEach(t => {
  t.context.products = Products(ProductsMock);
});

test.serial('products can be added and read', async t => {
  const products = t.context.products;

  await products.add({id:"TEST_ID", name: "TEST_NAME", price: 1337});

  const result = await products.get({id: "TEST_ID"})

  t.is(result.id, "TEST_ID");
  t.is(result.name, "TEST_NAME");
  t.is(result.price, 1337);
})

test.serial('errors when trying to add a product with an existing ID', async t => {
  const products = t.context.products;

  await products.add({id:"TEST_ID", name: "TEST_NAME", price: 1337});

  await t.throwsAsync(
    products.add({id:"TEST_ID", name: "TEST_NAME", price: 1337}),
    {message: 'Unable to add product'}
  )
})

test.serial('errors when an ID is not found', async t => {
  const products = t.context.products;

  await t.throwsAsync(
    products.get({id:"TEST_ID"}),
    {message: 'Unable to get product with public id, TEST_ID'}
  )
})
