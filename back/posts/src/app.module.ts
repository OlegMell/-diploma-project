import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO_URL } from './config';
import { PostsModule } from './modules/post/posts.module';

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }),
    SharedModule,
    PostsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
