import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private users: User[] = [];

  createUser(user: CreateUserDto): User {
    const newUser = new User();
    newUser.id = Date.now().toString();
    newUser.firstName = user.firstName;
    newUser.lastName = user.lastName;
    newUser.age = user.age;
    newUser.email = user.email;
    newUser.weight = user.weight;
    newUser.height = user.height;
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findById(id: string): User {
    return this.users.find((user) => user.id === id);
  }

  updateUser(id: string, updateUserDto: UpdateUserDto): User {
    const user = this.findById(id);
    if (!user) {
      throw new Error(`User with id ${id} not found`);
    }
    if (updateUserDto.firstName) {
      user.firstName = updateUserDto.firstName;
    }
    if (updateUserDto.lastName) {
      user.lastName = updateUserDto.lastName;
    }
    if (updateUserDto.age) {
      user.age = updateUserDto.age;
    }
    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }
    if (updateUserDto.weight) {
      user.weight = updateUserDto.weight;
    }
    if (updateUserDto.height) {
      user.height = updateUserDto.height;
    }
    return user;
  }

  deleteUser(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
