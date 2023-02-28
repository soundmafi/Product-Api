import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TopPageController } from './top-page.controller';
import { TopPageModel } from './top-page.model/top-page.model';

@Module({
  controllers: [TopPageController],
  imports: [
    MongooseModule.forFeature([
      {
        name: 'TopPage',
        schema: TopPageModel,
        collection: 'TopPage',
      },
    ]),
  ],
})
export class TopPageModule {}
