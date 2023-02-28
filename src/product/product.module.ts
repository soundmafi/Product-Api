import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductController } from './product.controller';
import { ProductModel } from './product.model/product.model';

@Module({
  controllers: [ProductController],
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Product',
        schema: ProductModel,
        collection: 'Product',
      },
    ]),
  ],
})
export class ProductModule {}
