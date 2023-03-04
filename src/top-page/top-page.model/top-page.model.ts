import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Index } from '@typegoose/typegoose';

export interface TopPageModel extends Base {}
export class HhData {
  @Prop()
  count: number;

  @Prop()
  juniorSalary: number;

  @Prop()
  middleSalary: number;

  @Prop()
  seniorSalary: number;
}

export class TopPageAdvantage {
  @Prop()
  title: string;
  @Prop()
  description: string;
}
export enum TopLevelCategory {
  Courses,
  Servises,
  Books,
  Products,
}

@Index({ '$**': 'text' })
@Schema()
export class TopPageModel extends TimeStamps {
  @Prop({ enum: TopLevelCategory })
  firstCategory: TopLevelCategory;

  @Prop()
  secondCategory: string;

  @Prop({ unique: true })
  alias: string;

  @Prop({ text: true })
  title: string;

  @Prop()
  category: string;

  @Prop({ type: () => HhData })
  hh?: HhData;

  @Prop({ type: () => [TopPageAdvantage] })
  advantages: TopPageAdvantage[];

  @Prop()
  seoText: string;

  @Prop()
  tagsTitle: string;

  @Prop({ type: () => [String] })
  tags: string[];
}

export const TopPageSchema = SchemaFactory.createForClass(TopPageModel);
export type TopPageDocument = HydratedDocument<TopPageModel>;
