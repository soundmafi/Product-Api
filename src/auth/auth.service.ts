import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthDocument } from './auth.model/user.model';
import { AuthDto } from './dto/auth.dto';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Auth') private readonly userModel: Model<AuthDocument>,
  ) {}
  async createUser(dto: AuthDto) {
    const salt = genSaltSync(10);
    const newUser = new this.userModel({
      email: dto.login,
      passwordHash: hashSync(dto.password, salt),
    });

    return newUser.save();
  }

  async findUser(email: string) {
    return this.userModel.findOne({ email }).exec();
  }
}
