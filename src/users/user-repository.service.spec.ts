import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserRepositoryService } from './user-repository.service';

describe('UserRepositoryService', () => {
  let service: UserRepositoryService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepositoryService,
        {
          provide: getRepositoryToken(User),
          useClass: class MockRepository extends Repository<User> {
            async findOneOrFail(id: number): Promise<User> {
              const user = new User();
              user.id = id;
              return user;
            }
          },
        },
      ],
    }).compile();

    service = module.get<UserRepositoryService>(UserRepositoryService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const user = await service.findOne(1);
      expect(user.id).toEqual(1);
    });

    it('should throw an error if user is not found', async () => {
      jest.spyOn(repo, 'findOneOrFail').mockImplementationOnce(() => {
        throw new Error('User not found');
      });
      await expect(service.findOne(2)).rejects.toThrowError('User not found');
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const userData = { name: 'John', email: 'john@example.com' };
      const user = await service.create(userData);
      expect(user).toMatchObject(userData);
      expect(repo.save).toHaveBeenCalledWith(user);
    });
  });

  describe('update', () => {
    it('should update an existing user', async () => {
      const userData = { id: 1, name: 'John Doe', email: 'john@example.com' };
      const updatedUser = await service.update(1, userData);
      expect(updatedUser).toMatchObject(userData);
      expect(repo.save).toHaveBeenCalledWith(updatedUser);
    });

    it('should throw an error if user is not found', async () => {
      jest.spyOn(service, 'findOne').mockImplementationOnce(() => null);
      const userData = { id: 2, name: 'John Doe', email: 'john@example.com' };
      await expect(service.update(2, userData)).rejects.toThrowError(
        'User not found',
      );
    });
  });

  describe('delete', () => {
    it('should delete an existing user', async () => {
      await expect(service.delete(1)).resolves.not.toThrow();
      expect(repo.delete).toHaveBeenCalledWith({ id: 1 });
    });

   
