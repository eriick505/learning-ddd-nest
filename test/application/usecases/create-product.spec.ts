import { CreateProduct } from '@application/usecases';

import { makeProduct } from '@test/factories';
import { InMemoryProductRepository } from '@test/repositories';

describe('Create Product', () => {
  it('should be able to create a product', async () => {
    const repository = new InMemoryProductRepository();
    const createProduct = new CreateProduct(repository);

    const { product } = await createProduct.execute(makeProduct());

    expect(repository.productList).toHaveLength(1);
    expect(repository.productList[0]).toEqual(product);
  });
});
