import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ProductModel } from 'src/product/product.model/product.model';
import { ReviewModel } from './review.model/review.model';

@Controller('review')
export class ReviewController {
  @Post('create')
  async create(@Body() dto: Omit<ReviewModel, '_id'>) {}
  @Delete('delete')
  async delete(@Param('id') dto: string) {}
  @Get('byProduct/:productId')
  async getByProduct(@Param('productId') productId: string) {}
}
