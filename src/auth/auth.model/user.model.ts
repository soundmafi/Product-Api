import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { HydratedDocument } from 'mongoose';

export interface UserModel extends Base {}
@Schema()
export class UserModel extends TimeStamps {
  @Prop({
    unique: true,
  })
  email: string;

  @Prop()
  passwordHash: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
export type AuthDocument = HydratedDocument<UserModel>;
