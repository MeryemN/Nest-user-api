import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a user', async () => {
    const user = {
      id: 1,
      name: 'John',
      surname: 'Doe',
      age: 35,
      email: 'john.doe@example.com',
      weight: 75,
      height: 180,
    };
    await service.create(user);
    expect(service.findAll()).toContain(user);
  });
});
