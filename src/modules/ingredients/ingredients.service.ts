import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Ingredient,
  IngredientDocument,
} from '../../db/ingredient/ingredient.schema';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectModel(Ingredient.name)
    private ingredientModel: Model<IngredientDocument>,
  ) {}

  async findAll(): Promise<Ingredient[]> {
    return await this.ingredientModel.find().exec();
  }

  async createFromArray(arr: string[]): Promise<void> {
    await Promise.all(
      arr.map(async (el) => {
        await new this.ingredientModel({ name: el }).save();
      }),
    );
  }
}
