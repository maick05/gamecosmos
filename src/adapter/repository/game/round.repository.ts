import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseRepository } from '@devseeder/nestjs-microservices-commons';
import { Round, RoundDocument } from 'src/domain/schema/game/round.schema';

@Injectable()
export class RoundRepository extends MongooseRepository<Round, RoundDocument> {
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
