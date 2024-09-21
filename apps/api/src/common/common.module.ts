import { Global, Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_PIPE } from '@nestjs/core';
import { AuthenticationModule } from '@/authentication/authentication.module';
import { AuthenticationGuard } from './guard/authentication-guard.service';
import { ErrorFilter } from '@/common/filter/error.filter';

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
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
  imports: [AuthenticationModule],
})
export class CommonModule {}
