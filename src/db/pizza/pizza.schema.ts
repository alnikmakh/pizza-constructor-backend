import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Ingredient } from '../ingredient/ingredient.schema';

export type PizzaDocument = Pizza & Document;

@Schema()
export class Pizza {
  @Prop()
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }] })
  ingredients: Ingredient[];

  @Prop()
  thickDough: boolean;
}

export const PizzaSchema = SchemaFactory.createForClass(Pizza);
