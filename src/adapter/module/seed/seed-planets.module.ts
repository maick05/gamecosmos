import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MatchModule } from '../game/match.module';
import { GenerateController } from 'src/adapter/controller/generate.controller';
import { SeedTeamsService } from 'src/application/service/seed/seed-teams.service';
import { LocationModule } from '../location/location.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('database.mongodb.seed-connection')
      })
    }),
    MatchModule,
    LocationModule
  ],
  controllers: [GenerateController],
  providers: [SeedTeamsService]
})
export class SeedPlanetsModule {}
