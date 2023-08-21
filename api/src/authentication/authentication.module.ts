import { Module } from '@nestjs/common';
import { UserModule } from '@/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationController } from './http-server/controller/authentication.controller';
import { AuthenticationService } from './domain/service/authentication.service';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
  exports: [AuthenticationService],
  imports: [
    JwtModule.register({
      secret: 'dummy',
      signOptions: { expiresIn: '60m' },
    }),
    PassportModule,
    UserModule,
  ],
})
export class AuthenticationModule {}
