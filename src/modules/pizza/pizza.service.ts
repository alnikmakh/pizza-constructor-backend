import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { Pizza, PizzaDocument } from '../../db/pizza/pizza.schema';
import { PizzaDTO } from './pizza.dto';
import {
  Ingredient,
  IngredientDocument,
} from '../../db/ingredient/ingredient.schema';

@Injectable()
export class PizzaService {
  constructor(
    @InjectModel(Pizza.name)
    private pizzaModel: Model<PizzaDocument>,
    @InjectModel(Ingredient.name)
    private ingredientModel: Model<IngredientDocument>,
  ) {}

  async findOne(options: FilterQuery<PizzaDocument>): Promise<Pizza> {
    return await this.pizzaModel.findOne(options).exec();
  }

  async findAll(): Promise<Pizza[]> {
    return await this.pizzaModel.find().populate('ingredients').exec();
  }

  async createOne(options: PizzaDTO): Promise<Pizza> {
    const findIngredients = () => {
      return Promise.all(
        options.ingredients.map(async (el) => {
          const result = await this.ingredientModel.find({ name: el });
          if (result[0] && result.length !== 0) {
            return result[0];
          }
        }),
      );
    };
    const ingredients = await findIngredients();

    const newPizzaModel = new this.pizzaModel({
      name: options.name,
      ingredients: ingredients.filter((el) => !!el),
      thickDough: options.dough === 'thick',
    });
    return newPizzaModel.save();
  }
}
