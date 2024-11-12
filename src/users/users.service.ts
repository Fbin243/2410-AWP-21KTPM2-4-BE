import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from './models/users.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(email: string, password: string): Promise<User> {
    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = new this.userModel({ email, password: hashedPassword });
    return user.save();
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email });
  }
}
