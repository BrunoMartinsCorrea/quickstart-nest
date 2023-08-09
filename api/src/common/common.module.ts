import { Global, Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from './guards/authentication-guard.service';
import { AuthenticationModule } from '../authentication/authentication.module';
import { ErrorFilter } from './filter/error.filter';

@Global()
@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
  imports: [AuthenticationModule],
})
export class CommonModule {}
