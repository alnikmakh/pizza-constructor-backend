import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PizzaModule } from './modules/pizza/pizza.module';
import { IngredientsModule } from './modules/ingredients/ingredients.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/pizza'),
    UserModule,
    AuthModule,
    PizzaModule,
    IngredientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
