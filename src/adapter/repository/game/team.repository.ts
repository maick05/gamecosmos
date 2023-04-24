import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Team, TeamDocument } from 'src/domain/schema/game/team.schema';
import { GameRepository } from '../game.repository';

@Injectable()
export class TeamRepository extends GameRepository<Team, TeamDocument> {
  constructor(
    @InjectModel(Team.name)
    model: Model<TeamDocument>
  ) {
    super(model);
  }

  async findTeamsByCountry(idCountry: string): Promise<TeamDocument[]> {
    return this.model.find({ idCountry }, { _id: 1, name: 1 });
  }
}
