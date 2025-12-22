import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { HealthModule } from './health/health.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';

@Module({

  imports: [LoggerModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => {
      const isProduction = configService.get('NODE_ENV') === 'production';
      return {
        pinoHttp: {
          transport: isProduction ? undefined : {
            target: 'pino-pretty',
            options: {
              singleLine: true,
            },
          },
          level: isProduction ? 'info' : 'debug',
        },
      };
    },
    inject: [ConfigService],
  }),
  ConfigModule.forRoot(), UsersModule, HealthModule, AuthModule, ProductsModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
