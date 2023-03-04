import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTopPageDto } from './dto/create.top-page.dto';

import {
  TopLevelCategory,
  TopPageDocument,
} from './top-page.model/top-page.model';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel('TopPage')
    private readonly topPageModel: Model<TopPageDocument>,
  ) {}

  async create(dto: CreateTopPageDto): Promise<TopPageDocument> {
    return this.topPageModel.create(dto);
  }

  async updateById(
    id: string,
    dto: CreateTopPageDto,
  ): Promise<TopPageDocument> {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async deleteById(id: string): Promise<TopPageDocument | null> {
    return this.topPageModel.findByIdAndRemove(id).exec();
  }

  async findById(id: string): Promise<TopPageDocument> {
    return this.topPageModel.findById(id).exec();
  }

  async findByAlias(alias: string) {
    return this.topPageModel.findOne({ alias }).exec();
  }

  async findByCategory(firstCategory: TopLevelCategory) {
    return this.topPageModel
      .find({ firstCategory }, { alias: 1, secondCategory: 1, title: 1 })
      .exec();
  }

  async findAll(): Promise<TopPageDocument[]> {
    return this.topPageModel.find().exec();
  }
  async findByText(text: string): Promise<TopPageDocument[]> {
    return this.topPageModel
      .find({ $text: { $search: text, $caseSensitive: false } })
      .exec();
  }
}
