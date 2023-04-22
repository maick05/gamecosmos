import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stage, StageDocument } from 'src/domain/schema/game/stage.schema';
import { GameRepository } from '../game.repository';

@Injectable()
export class StageRepository extends GameRepository<Stage, StageDocument> {
  constructor(
    @InjectModel(Stage.name)
    model: Model<StageDocument>
  ) {
    super(model);
  }

  async createStage(stage: Stage): Promise<StageDocument> {
    return this.model.create(stage);
  }
}
