import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Competition,
  CompetitionDocument
} from 'src/domain/schema/game/competition.schema';
import { GameRepository } from '../game.repository';

@Injectable()
export class CompetitionRepository extends GameRepository<
  Competition,
  CompetitionDocument
> {
  constructor(
    @InjectModel(Competition.name)
    model: Model<CompetitionDocument>
  ) {
    super(model);
  }
}
