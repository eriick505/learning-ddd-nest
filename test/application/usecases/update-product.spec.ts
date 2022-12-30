import { UpdateProduct } from '@application/usecases';
import { makeProduct } from '@test/factories';
import { InMemoryProductRepository } from '@test/repositories';

describe('Update Product', () => {
  it('should be able to update a product', async () => {
    const repository = new InMemoryProductRepository();
    const updateProduct = new UpdateProduct(repository);

    const product = makeProduct(
      {
        name: 'Product with no updates',
        price: 100.55,
        categoryId: 'category-id',
      },
      'id-product-to-update',
    );

    await repository.create(makeProduct());
    await repository.create(product);
    await repository.create(makeProduct());
    await repository.create(makeProduct());

    const productToUpdate = {
      id: product.id,
      data: {
        name: 'Product with updates',
        price: 200,
        categoryId: 'updated-category-id',
      },
    };

    const response = await updateProduct.execute(productToUpdate);

    expect(response.isRight()).toBeTruthy();
    expect(repository.productList).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: productToUpdate.data.name,
          price: productToUpdate.data.price,
          categoryId: productToUpdate.data.categoryId,
        }),
      ]),
    );
  });
});
