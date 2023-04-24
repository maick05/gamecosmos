import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Pontuation,
  PontuationDocument
} from 'src/domain/schema/game/pontuation.schema';
import { GameRepository } from '../game.repository';

@Injectable()
export class PontuationRepository extends GameRepository<
  Pontuation,
  PontuationDocument
> {
  constructor(
    @InjectModel(Pontuation.name)
    model: Model<PontuationDocument>
  ) {
    super(model);
  }
}
