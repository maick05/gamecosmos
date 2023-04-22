import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseRepository } from '@devseeder/nestjs-microservices-commons';
import {
  Competition,
  CompetitionDocument
} from 'src/domain/schema/game/competition.schema';

@Injectable()
export class CompetitionRepository extends MongooseRepository<
  Competition,
  CompetitionDocument
> {
  constructor(
    @InjectModel(Competition.name)
    model: Model<CompetitionDocument>
  ) {
    super(model);
  }

  async createCompetition(
    competition: Competition
  ): Promise<CompetitionDocument> {
    return this.model.create(competition);
  }
}
