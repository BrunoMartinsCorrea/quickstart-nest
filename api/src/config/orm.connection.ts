import * as path from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default () =>
  ({
    type: process.env.ORM_TYPE,
    host: process.env.ORM_HOST,
    port: process.env.ORM_PORT,
    username: process.env.ORM_USERNAME,
    password: process.env.ORM_PASSWORD,
    database: process.env.ORM_DATABASE,
    entities: [path.join(__dirname, '..', '/**/*.entity{.ts,.js}')],
    synchronize: true,
    autoLoadEntities: true,
  }) as TypeOrmModuleOptions;
