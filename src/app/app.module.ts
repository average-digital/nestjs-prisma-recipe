import { Module } from '@nestjs/common';
import { UsersModule } from 'users/users.module';
import { PostsModule } from 'posts/post.module';

@Module({
  imports: [UsersModule, PostsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
