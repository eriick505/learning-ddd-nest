import { GetProduct, ProductNotFound } from '@application/usecases';

import { makeProduct } from '@test/factories';
import { InMemoryProductRepository } from '@test/repositories';

describe('Get Product', () => {
  it('should be able to get a product', async () => {
    const repository = new InMemoryProductRepository();
    const getProduct = new GetProduct(repository);

    const product = makeProduct();

    await repository.create(product);
    await repository.create(makeProduct());

    const productFound = await getProduct.execute({
      productId: product.id,
    });

    expect({ product }).toEqual(productFound.value);
  });

  it('should not get a product that not exist', async () => {
    const repository = new InMemoryProductRepository();
    const getProduct = new GetProduct(repository);

    const productOrError = await getProduct.execute({ productId: 'productId' });

    expect(productOrError.isLeft()).toBeTruthy();
    expect(productOrError.value).toEqual(new ProductNotFound());
  });
});
