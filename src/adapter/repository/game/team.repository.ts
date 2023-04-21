import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseRepository } from '@devseeder/nestjs-microservices-commons';
import { Team, TeamDocument } from 'src/domain/schema/game/team.schema';

@Injectable()
export class TeamRepository extends MongooseRepository<Team, TeamDocument> {
  constructor(
    @InjectModel(Team.name)
    model: Model<TeamDocument>
  ) {
    super(model);
  }

  async createTeam(team: Team): Promise<TeamDocument> {
    return this.model.create(team);
  }
}
