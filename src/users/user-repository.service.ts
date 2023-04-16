import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserRepositoryService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { nom, prenom, age, mail, id, poids, taille } = createUserDto;
    const user = this.userRepository.create({
      nom,
      prenom,
      age,
      mail,
      id,
      poids,
      taille,
    });
    return this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    const { nom, prenom, age, mail, poids, taille } = updateUserDto;
    user.nom = nom ?? user.nom;
    user.prenom = prenom ?? user.prenom;
    user.age = age ?? user.age;
    user.mail = mail ?? user.mail;
    user.poids = poids ?? user.poids;
    user.taille = taille ?? user.taille;
    return this.userRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
