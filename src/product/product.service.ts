import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  ReviewDocument,
  ReviewModel,
} from 'src/review/review.model/review.model';
import { CreateProductDto } from './dto/create-product.dto';
import { FindProductDto } from './dto/find-product.dto';
import { ProductDocument, ProductModel } from './product.model/product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product')
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(dto: CreateProductDto): Promise<ProductDocument> {
    return this.productModel.create(dto);
  }

  async findById(id: string): Promise<ProductDocument> {
    return this.productModel.findById(id).exec();
  }

  async findAll(): Promise<ProductDocument[] | null> {
    return this.productModel.find().exec();
  }

  async deleteById(id: string) {
    return this.productModel.findByIdAndDelete(id).exec();
  }

  async updateById(
    id: string,
    dto: CreateProductDto,
  ): Promise<ProductDocument> {
    return this.productModel.findByIdAndUpdate(id, dto, { new: true }).exec();
  }

  async findWithReviews(dto: FindProductDto) {
    return (await this.productModel
      .aggregate([
        {
          $match: {
            categories: dto.category,
          },
        },
        {
          $limit: dto.limit,
        },

        { $sort: { _id: 1 } },

        {
          $lookup: {
            from: 'reviews',
            localField: '_id',
            foreignField: 'productId',
            as: 'customReviews',
          },
        },
        {
          $addFields: {
            reviewCount: { $size: '$customReviews' },
            reviewAvg: { $avg: '$customReviews.rating' },
          },
        },
      ])
      .exec()) as unknown as (ReviewDocument & {
      review: ReviewDocument[];
      reviewCount: number;
      reviewAvg: number;
    })[];
  }
}
