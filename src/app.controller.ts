import { Controller, Get, UseGuards, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './modules/auth/auth.service';
import { PizzaService } from './modules/pizza/pizza.service';
import { IngredientsService } from './modules/ingredients/ingredients.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly pizzaService: PizzaService,
    private readonly ingredientsService: IngredientsService,
  ) {}

  @Get('ingredients')
  async getIngredients() {
    await this.appService.initIngredients();
    await this.appService.initUser();
    return await this.ingredientsService.findAll();
  }

  @Get('pizzas')
  async getPizzas() {
    return await this.pizzaService.findAll();
  }

  @Post('pizza')
  async createPizza(@Request() req) {
    return await this.pizzaService.createOne(req.body);
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
