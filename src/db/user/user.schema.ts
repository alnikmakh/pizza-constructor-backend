import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  login: boolean;

  @Prop()
  password: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
