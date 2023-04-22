import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Competition,
  CompetitionsSchema
} from 'src/domain/schema/game/competition.schema';
import { CompetitionRepository } from '../../repository/game/competition.repository';
import { CreateCompetitionService } from 'src/application/service/competition/create-competition.service';
import { LocationModule } from '../location/location.module';
import { CardModule } from './card.module';
import { CreateCupService } from 'src/application/service/competition/create-cup.service';
import { CompetitionController } from 'src/adapter/controller/competition.controller';
import { TeamModule } from './team.module';
import { StageModule } from './stage.module';
import { RoundModule } from './round.module';
import { MatchModule } from './match.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Competition.name, schema: CompetitionsSchema }
    ]),
    CardModule,
    LocationModule,
    MatchModule,
    TeamModule,
    StageModule,
    RoundModule
  ],
  controllers: [CompetitionController],
  providers: [
    CompetitionRepository,
    CreateCompetitionService,
    CreateCupService
  ],
  exports: [CompetitionRepository, CreateCompetitionService, CreateCupService]
})
export class CompetitionModule {}
