import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity'; // Importing the User entity

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Adding the User entity to the TypeORM module
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
