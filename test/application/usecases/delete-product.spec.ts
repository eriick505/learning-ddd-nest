import { DeleteProduct } from '@application/usecases';

import { makeProduct } from '@test/factories';
import { InMemoryProductRepository } from '@test/repositories';

describe('Delete Product', () => {
  it('should be able to delete a product', async () => {
    const repository = new InMemoryProductRepository();
    const deleteProduct = new DeleteProduct(repository);

    const productId = 'product-id';
    const product = makeProduct({}, productId);

    await repository.create(product);
    await repository.create(makeProduct());
    await repository.create(makeProduct());
    await repository.create(makeProduct());

    await deleteProduct.execute({
      productId,
    });

    expect(repository.productList.length).toEqual(3);
  });
});
