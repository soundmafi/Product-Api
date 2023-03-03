import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class HhData {
  @IsNumber()
  count: number;

  @IsNumber()
  juniorSalary: number;

  @IsNumber()
  middleSalary: number;

  @IsNumber()
  seniorSalary: number;
}

export class TopPageAdvantageDto {
  @IsString()
  title: string;
  @IsString()
  description: string;
}
export enum TopLevelCategoryDto {
  Courses,
  Servises,
  Books,
  Products,
}

export class TopPageDto {
  @IsEnum(TopLevelCategoryDto)
  firstLevelCategory: TopLevelCategoryDto;

  @IsString()
  secondCategory: string;

  @IsString()
  alias: string;

  @IsString()
  title: string;

  @IsString()
  category: string;

  @IsString()
  hh?: HhData;

  @IsArray()
  @ValidateNested()
  @Type(() => TopPageAdvantageDto)
  advantages: TopPageAdvantageDto[];

  @IsString()
  seoText: string;

  @IsString()
  tagsTitle: string;

  @IsString({ each: true })
  tags: string[];
}
