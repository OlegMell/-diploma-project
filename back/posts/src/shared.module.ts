import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule, Module } from '@nestjs/common';
import { Post } from './modules/post/schema/post.schema';
import { Comment } from './modules/post/schema/comment.schema';
import { PostsRepository } from './shared/repositories/posts.repository';
import { UsersService } from './shared/services/users.service';
import { DropboxService } from './shared/services/dropbox.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'PostModel', schema: Post },
      { name: 'CommentModel', schema: Comment },
    ]),
    HttpModule,
    JwtModule.register({
      secret: 'bigcock',
      signOptions: { expiresIn: '86400s' },
    }),
  ],

  controllers: [],
  providers: [PostsRepository, UsersService, DropboxService],
  exports: [PostsRepository, UsersService, DropboxService, JwtModule],
})
export class SharedModule {}
