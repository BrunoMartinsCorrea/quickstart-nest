import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { LoggerMiddleware } from '@/common/middleware/logger.middleware';
import { AuthenticationModule } from '@/authentication/authentication.module';
import { UserModule } from '@/user/user.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CommonModule } from '@/common/common.module';
import ormConnection from '@/config/orm.connection';
import { ConfigModule } from '@nestjs/config';
import { AuthorizationModule } from './authorization/authorization.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConnection],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'web', 'dist'),
    }),
    TypeOrmModule.forRoot(ormConnection() as TypeOrmModuleOptions),
    CommonModule,
    AuthenticationModule,
    UserModule,
    AuthorizationModule,
  ],
  controllers: [],
  providers: [],
})
export class MainModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
