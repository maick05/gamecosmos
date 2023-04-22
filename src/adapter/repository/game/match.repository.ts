import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseRepository } from '@devseeder/nestjs-microservices-commons';
import { Match, MatchDocument } from 'src/domain/schema/game/match.schema';

@Injectable()
export class MatchRepository extends MongooseRepository<Match, MatchDocument> {
  constructor(
    @InjectModel(Match.name)
    model: Model<MatchDocument>
  ) {
    super(model);
  }

  async createMatch(match: Match): Promise<MatchDocument> {
    return this.model.create(match);
  }
}
