import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BackofficeModule } from 'src/backoffice/backoffice.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    /*     TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'mariadb_dkc',
      port: 7654,
      username: 'root',
      password: 'root',
      database: 'dkc',
    
      synchronize: true,
    }), */
    BackofficeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// entities: [__dirname + '/**/*.entity{.ts,.js}'],
