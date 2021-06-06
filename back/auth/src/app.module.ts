import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import {MONGO_URL} from 'src/config/index';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
