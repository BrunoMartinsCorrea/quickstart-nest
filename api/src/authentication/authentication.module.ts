import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
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
