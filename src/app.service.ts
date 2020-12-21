import { Injectable } from '@nestjs/common';
import { AuthService } from './modules/auth/auth.service';
import { PizzaService } from './modules/pizza/pizza.service';
import { IngredientsService } from './modules/ingredients/ingredients.service';
import { ingredientsMock } from './mock';
import { UserService } from './modules/user/user.service';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require('bcrypt');

@Injectable()
export class AppService {
  constructor(
    private readonly authService: AuthService,
    private readonly pizzaService: PizzaService,
    private readonly ingredientsService: IngredientsService,
    private userService: UserService,
  ) {}

  async initIngredients(): Promise<void> {
    const ingredients = await this.ingredientsService.findAll();
    if (ingredients.length === 0) {
      await this.ingredientsService.createFromArray(ingredientsMock);
    }
  }

  async initUser(): Promise<void> {
    const users = await this.userService.findAll();
    const password = await bcrypt.hash('admin', 10);
    if (users.length === 0) {
      await this.userService.create({ login: 'admin', password });
    }
  }
}
