import { CreateProduct } from '@application/usecases';
import { InMemoryProductRepository } from '@test/repositories';

describe('Create Product', () => {
  it('should be able to create a product', async () => {
    const repository = new InMemoryProductRepository();
    const createProduct = new CreateProduct(repository);

    const product = {
      name: 'Product name',
      price: 203.44,
      rating: 3.4,
      categoryId: 'category-id',
      image: {
        path: 'http://teste.com/image.png',
      },
    };

    const response = await createProduct.execute(product);

    expect(response.isRight()).toBeTruthy();
    expect(repository.productList).toHaveLength(1);
    expect(repository.productList[0]).toEqual(
      expect.objectContaining({ name: product.name, price: product.price }),
    );
  });
});
