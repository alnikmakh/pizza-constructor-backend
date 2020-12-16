import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Ingredient,
  IngredientDocument,
} from './db/ingredient/ingredient.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Ingredient.name)
    private ingredientModel: Model<IngredientDocument>,
  ) {}

  async getHello(): Promise<Ingredient[]> {
    return this.ingredientModel.find().exec();
  }
}
