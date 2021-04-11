import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostModel } from '@prisma/client';

@Controller()
export class PostsController {
  constructor(private readonly service: PostService) {}

  @Get('post/:id')
  async getPostById(@Param('id') id: string): Promise<PostModel> {
    return this.service.get({ id: Number(id) });
  }

  @Get('feed')
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.service.list({
      where: { published: true },
    });
  }

  @Get('drafts')
  async getUnpublishedPosts(): Promise<PostModel[]> {
    return this.service.list({
      where: { published: false },
    });
  }

  @Get('posts')
  async getFilteredPosts(
    @Query('filter') searchString: string,
  ): Promise<PostModel[]> {
    return this.service.list({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    });
  }

  @Post('posts')
  async createDraft(
    @Body() postData: { title: string; content?: string; authorEmail: string },
  ): Promise<PostModel> {
    const { title, content, authorEmail } = postData;
    return this.service.create({
      title,
      content,
      author: {
        connect: { email: authorEmail },
      },
    });
  }

  @Put('posts/:id/publish')
  async publishPost(@Param('id') id: string): Promise<PostModel> {
    return this.service.update({
      where: { id: Number(id) },
      data: { published: true },
    });
  }

  @Delete('posts/:id')
  async deletePost(@Param('id') id: string): Promise<PostModel> {
    return this.service.delete({ id: Number(id) });
  }
}
