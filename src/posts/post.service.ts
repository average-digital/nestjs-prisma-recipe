import { Injectable } from '@nestjs/common';
import { PrismaService } from 'shared/prisma.service';
import { Post, Prisma } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private db: PrismaService) {}

  async get(
    postWhereUniqueInput: Prisma.PostWhereUniqueInput,
  ): Promise<Post | null> {
    return this.db.post.findUnique({
      where: postWhereUniqueInput,
    });
  }

  async list(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PostWhereUniqueInput;
    where?: Prisma.PostWhereInput;
    orderBy?: Prisma.PostOrderByInput;
  }): Promise<Post[]> {
    return this.db.post.findMany(params);
  }

  async create(data: Prisma.PostCreateInput): Promise<Post> {
    return this.db.post.create({
      data,
    });
  }

  async update(params: {
    where: Prisma.PostWhereUniqueInput;
    data: Prisma.PostUpdateInput;
  }): Promise<Post> {
    const { data, where } = params;
    return this.db.post.update({
      data,
      where,
    });
  }

  async delete(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.db.post.delete({
      where,
    });
  }
}
