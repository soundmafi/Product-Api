import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthModel } from './auth.model/auth.model';

@Module({
  controllers: [AuthController],
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Auth',
        schema: AuthModel,
        collection: 'Auth',
      },
    ]),
  ],
})
export class AuthModule {}
