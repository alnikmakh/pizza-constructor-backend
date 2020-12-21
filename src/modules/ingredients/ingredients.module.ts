import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Ingredient,
  IngredientSchema,
} from '../../db/ingredient/ingredient.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ingredient.name, schema: IngredientSchema },
    ]),
  ],
  providers: [IngredientsService],
  exports: [IngredientsService],
})
export class IngredientsModule {}
