import { GetAllProduct } from '@application/usecases';

import { makeProduct } from '@test/factories';
import { InMemoryProductRepository } from '@test/repositories';

describe('Get all products', () => {
  it('should be able to get all products', async () => {
    const repository = new InMemoryProductRepository();
    const getAllProduct = new GetAllProduct(repository);

    await repository.create(makeProduct());
    await repository.create(makeProduct());
    await repository.create(makeProduct());

    const { products } = await getAllProduct.execute();

    expect(products.length).toEqual(repository.productList.length);
  });
});
