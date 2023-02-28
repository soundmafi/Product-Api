import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';
import { HydratedDocument } from 'mongoose';

export interface AuthModel extends Base {}
@Schema()
export class AuthModel extends TimeStamps {
  @Prop({
    unique: true,
  })
  email: string;

  @Prop()
  passwordHash: string;
}

export const AuthSchema = SchemaFactory.createForClass(AuthModel);
export type AuthDocument = HydratedDocument<AuthModel>;
