import { HttpModule, Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './services/posts.service';
import { SharedModule } from '../../shared.module';

@Module({
  imports: [HttpModule, SharedModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
