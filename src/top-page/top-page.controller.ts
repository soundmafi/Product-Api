import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { TopPageDto } from './dto/create.top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TOP_PAGE_NOT_FOUND } from './top-page.constants';
import { TopPageModel } from './top-page.model/top-page.model';
import { TopPageService } from './top-page.service';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @Post('create')
  async create(@Body() dto: TopPageDto) {
    return this.topPageService.create(dto);
  }

  @Get(':id')
  async get(@Param('id', IdValidationPipe) id: string) {
    const topPage = await this.topPageService.findById(id);
    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND);
    }
    return topPage;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deleteTopPage = await this.topPageService.deleteById(id);
    if (!deleteTopPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND);
    }
  }

  @Patch(':id')
  async path(@Param('id') id: string, @Body() dto: TopPageDto) {
    const updatePage = await this.topPageService.updateById(id, dto);
    if (!updatePage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND);
    }
    return updatePage;
  }

  @HttpCode(200)
  @Post('find-all')
  async findAll() {
    return this.topPageService.findAll();
  }
}
