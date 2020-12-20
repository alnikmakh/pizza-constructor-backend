import { Module } from '@nestjs/common';
import { PizzaService } from './pizza.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pizza, PizzaSchema } from '../../db/pizza/pizza.schema';
import {
  Ingredient,
  IngredientSchema,
} from '../../db/ingredient/ingredient.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pizza.name, schema: PizzaSchema }]),
    MongooseModule.forFeature([{ name: Ingredient.name, schema: IngredientSchema }]),
  ],
  providers: [PizzaService],
  exports: [PizzaService],
})
export class PizzaModule {}
