import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Match, MatchDocument } from 'src/domain/schema/game/match.schema';
import { GameRepository } from '../game.repository';

@Injectable()
export class MatchRepository extends GameRepository<Match, MatchDocument> {
  constructor(
    @InjectModel(Match.name)
    model: Model<MatchDocument>
  ) {
    super(model);
  }

  async createMatch(match: Match): Promise<MatchDocument> {
    return this.model.create(match);
  }

  async findMatchsByRound(idRound: string): Promise<MatchDocument[]> {
    return this.model.find(
      { idRound },
      { _id: 1, idTeamHome: 1, idTeamOut: 1 }
    );
  }
}
