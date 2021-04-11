import { Module } from '@nestjs/common';
import { PrismaService } from 'shared/prisma.service';
import { PostsController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [],
  controllers: [PostsController],
  providers: [PrismaService, PostService],
})
export class PostsModule {}
