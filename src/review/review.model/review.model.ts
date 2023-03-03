import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { types } from '@typegoose/typegoose';

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
  productId: Types.ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(ReviewModel);
export type ReviewDocument = HydratedDocument<ReviewModel>;
