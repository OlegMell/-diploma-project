import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule, Module } from '@nestjs/common';
import { Post } from './modules/post/schema/post.schema';
import { Comment } from './modules/post/schema/comment.schema';
import { PostsRepository } from './shared/repositories/posts.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'PostModel', schema: Post },
      { name: 'CommentModel', schema: Comment },
    ]),
    HttpModule,
  ],
  controllers: [],
  providers: [PostsRepository],
  exports: [PostsRepository],
})
export class SharedModule {}
