import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // GET /product
  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  // GET /product/:id
  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productService.getProductById(Number(id));
  }

  // POST /product
  @Post()
  createProduct(@Body() body: { name: string; price: number }) {
    return this.productService.createProduct(body);
  }

  // PUT /product/:id  (full update)
  @Put(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() body: { name: string; price: number },
  ) {
    return this.productService.updateProduct(Number(id), body);
  }

  // PATCH /product/:id  (partial update)
  @Patch(':id')
  patchProduct(
    @Param('id') id: string,
    @Body() body: Partial<{ name: string; price: number }>,
  ) {
    return this.productService.patchProduct(Number(id), body);
  }

  // DELETE /product/:id
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(Number(id));
  }
}
