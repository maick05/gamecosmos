import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamsSchema } from 'src/domain/schema/game/Team.schema';
import { TeamRepository } from '../../repository/game/team.repository';
import { CreateTeamService } from 'src/application/service/team/create-team.service';
import { LocationModule } from '../location/location.module';
import { CardModule } from './card.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Team.name, schema: TeamsSchema }]),
    CardModule,
    LocationModule
  ],
  controllers: [],
  providers: [TeamRepository, CreateTeamService],
  exports: [TeamRepository, CreateTeamService]
})
export class TeamModule {}
