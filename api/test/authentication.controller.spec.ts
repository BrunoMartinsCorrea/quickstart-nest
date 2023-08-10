import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationController } from '@/authentication/http-server/controller/authentication.controller';
import { AuthenticationService } from '@/authentication/domain/service/authentication.service';

describe('AuthenticationController', () => {
  let controller: AuthenticationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthenticationController],
      providers: [AuthenticationService],
    }).compile();

    controller = module.get<AuthenticationController>(AuthenticationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
