import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Ingredient } from './db/ingredient/ingredient.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Promise<Ingredient[]> {
    return this.appService.getHello();
  }
}
