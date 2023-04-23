import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Competition,
  CompetitionsSchema
} from 'src/domain/schema/game/competition.schema';
import { CompetitionRepository } from '../../repository/game/competition.repository';
import { CreateCompetitionService } from 'src/application/service/competition/create/create-competition.service';
import { LocationModule } from '../location/location.module';
import { CardModule } from './card.module';
import { CompetitionController } from 'src/adapter/controller/competition.controller';
import { TeamModule } from './team.module';
import { StageModule } from './stage.module';
import { RoundModule } from './round.module';
import { MatchModule } from './match.module';
import { CreateCupService } from 'src/application/service/competition/create/create-cup.service';
import { CreateCupRoundService } from 'src/application/service/competition/create/create-cup-round.service';
import { PlayCompetitionRoundService } from 'src/application/service/competition/play/play-competition-round.service';

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
    CreateCupService,
    CreateCupRoundService,
    PlayCompetitionRoundService
  ],
  exports: [
    CompetitionRepository,
    CreateCompetitionService,
    CreateCupService,
    CreateCupRoundService,
    PlayCompetitionRoundService
  ]
})
export class CompetitionModule {}
