import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchModule } from './match.module';
import { CompetitionModule } from './competition.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('database.mongodb.connection')
      })
    }),
    MatchModule,
    CompetitionModule
  ],
  controllers: [],
  providers: []
})
export class GameModule {}
