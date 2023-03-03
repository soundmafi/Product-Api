import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TopPageAdvantageDto, TopPageDto } from './dto/create.top-page.dto';
import { TopPageDocument } from './top-page.model/top-page.model';

@Injectable()
export class TopPageService {
  constructor(
    @InjectModel('TopPage')
    private readonly topPageModel: Model<TopPageDocument>,
  ) {}

  async create(dto: TopPageDto): Promise<TopPageDocument> {
    return this.topPageModel.create(dto);
  }

  async findById(id: string): Promise<TopPageDocument> {
    return this.topPageModel.findById(id);
  }

  async updateById(id: string, dto: TopPageDto): Promise<TopPageDocument> {
    return this.topPageModel.findByIdAndUpdate(id, dto, { new: true });
  }

  async findAll(): Promise<TopPageDocument[]> {
    return this.topPageModel.find().exec();
  }

  async deleteById(id: string): Promise<TopPageDocument | null> {
    return this.topPageModel.findByIdAndDelete(id).exec();
  }
}
