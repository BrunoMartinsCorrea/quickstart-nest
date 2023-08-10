import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '@/user/http-server/controller/user.controller';
import { UserService } from '@/user/domain/service/user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
