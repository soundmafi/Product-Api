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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { CreateTopPageDto } from './dto/create.top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { TOP_PAGE_NOT_FOUND } from './top-page.constants';
import { TopPageService } from './top-page.service';

@Controller('top-page')
export class TopPageController {
  constructor(private readonly topPageService: TopPageService) {}

  @Post('create')
  async create(@Body() dto: CreateTopPageDto) {
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
  async path(@Param('id') id: string, @Body() dto: CreateTopPageDto) {
    const updatePage = await this.topPageService.updateById(id, dto);
    if (!updatePage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND);
    }
    return updatePage;
  }

  @Get('byAlias/:alias')
  async getByAlias(@Param('alias') alias: string) {
    const topPage = await this.topPageService.findByAlias(alias);
    if (!topPage) {
      throw new NotFoundException(TOP_PAGE_NOT_FOUND);
    }
    return topPage;
  }

  @HttpCode(200)
  @Post('find-all')
  async findAll() {
    return this.topPageService.findAll();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('find')
  async find(@Body() dto: FindTopPageDto) {
    return this.topPageService.findByCategory(dto.firstCategory);
  }

  @Get('textSearch/:text')
  async textSearch(@Param('text') text: string) {
    return this.topPageService.findByText(text);
  }
}
