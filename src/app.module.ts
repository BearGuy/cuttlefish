import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PodcastModule } from './podcast/podcast.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration'

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(process.cwd(), 'client', 'assets'),
    // }),
    // ConfigModule.forRoot({
    //   load: [configuration],
    // }),
    UsersModule,
    AuthModule,
    PodcastModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
