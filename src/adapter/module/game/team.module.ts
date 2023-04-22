import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Team, TeamsSchema } from 'src/domain/schema/game/Team.schema';
import { TeamRepository } from '../../repository/game/team.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Team.name, schema: TeamsSchema }])
  ],
  controllers: [],
  providers: [TeamRepository],
  exports: [TeamRepository]
})
export class TeamModule {}
