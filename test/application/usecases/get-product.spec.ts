import { GetProduct } from '@application/usecases';

import { makeProduct } from '@test/factories';
import { InMemoryProductRepository } from '@test/repositories';

describe('Get Product', () => {
  it('should be able to get a product', async () => {
    const repository = new InMemoryProductRepository();
    const getProduct = new GetProduct(repository);

    const product = makeProduct();

    await repository.create(product);
    await repository.create(makeProduct());

    const { product: ProductFound } = await getProduct.execute({
      productId: product.id,
    });

    expect(product).toEqual(ProductFound);
  });

  it('should throw error when try to get a product that not exist', async () => {
    const repository = new InMemoryProductRepository();
    const getProduct = new GetProduct(repository);

    expect(() => {
      return getProduct.execute({ productId: 'productId' });
    }).rejects.toThrowError();
  });
});
