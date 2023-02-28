import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export interface ReviewModel extends Base {}
@Schema()
export class ReviewModel extends TimeStamps {
  @Prop()
  name: string;
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  rating: string;

  @Prop()
  createdAt: Date;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
export type ReviewDocument = HydratedDocument<ReviewModel>;
