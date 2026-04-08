import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductService {
  private products = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 300 },
  ];

  // GET all products
  getProducts() {
    return this.products;
  }

  // GET single product by id
  getProductById(id: number) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  // POST - create new product
  createProduct(body: { name: string; price: number }) {
    const newProduct = {
      id: this.products.length
        ? this.products[this.products.length - 1].id + 1
        : 1,
      name: body.name,
      price: body.price,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  // PUT - full replace/update
  updateProduct(id: number, body: { name: string; price: number }) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.products[index] = { id, name: body.name, price: body.price };
    return this.products[index];
  }

  // PATCH - partial update
  patchProduct(id: number, body: Partial<{ name: string; price: number }>) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.products[index] = { ...this.products[index], ...body };
    return this.products[index];
  }

  // DELETE
  deleteProduct(id: number) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    const deleted = this.products.splice(index, 1);
    return { message: `Product ${id} deleted successfully`, deleted: deleted[0] };
  }
}
