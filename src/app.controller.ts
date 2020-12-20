import { Controller, Get, UseGuards, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './modules/auth/auth.service';
import { PizzaService } from './modules/pizza/pizza.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
    private readonly pizzaService: PizzaService,
  ) {}

  @Get()
  async getHello() {
    return await this.pizzaService.createOne({
      name: 'First',
      ingredients: ['Томаты', 'Пепперони'],
      dough: 'thick',
    });
  }

  @Get('pizzas')
  async getPizzas() {
    return await this.pizzaService.findAll();
  }

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
