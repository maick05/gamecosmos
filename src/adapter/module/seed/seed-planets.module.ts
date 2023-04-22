import { Module } from '@nestjs/common';
import { GenerateController } from 'src/adapter/controller/generate.controller';
import { SeedTeamsService } from 'src/application/service/seed/seed-teams.service';
import { LocationModule } from '../location/location.module';
import { CardModule } from '../game/card.module';
import { TeamModule } from '../game/team.module';
import { FeatureModule } from './feature.module';

@Module({
  imports: [FeatureModule, CardModule, TeamModule, LocationModule],
  controllers: [GenerateController],
  providers: [SeedTeamsService]
})
export class SeedPlanetsModule {}
