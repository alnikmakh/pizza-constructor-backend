import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../../db/user/user.schema';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(options: FilterQuery<UserDocument>): Promise<User> {
    return await this.userModel.findOne(options).exec();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async create(user: User): Promise<void> {
    await new this.userModel(user).save();
  }
}
