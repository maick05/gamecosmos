import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Round, RoundDocument } from 'src/domain/schema/game/round.schema';
import { GameRepository } from '../game.repository';

@Injectable()
export class RoundRepository extends GameRepository<Round, RoundDocument> {
  constructor(
    @InjectModel(Round.name)
    model: Model<RoundDocument>
  ) {
    super(model);
  }

  async createRound(round: Round): Promise<RoundDocument> {
    return this.model.create(round);
  }
}
