import { Module } from '@nestjs/common';
import { PrismaService } from 'shared/prisma.service';
import { UsersController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [PrismaService, UserService],
})
export class UsersModule {}
