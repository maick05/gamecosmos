import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseRepository } from '@devseeder/nestjs-microservices-commons';
import { Stage, StageDocument } from 'src/domain/schema/game/stage.schema';

@Injectable()
export class StageRepository extends MongooseRepository<Stage, StageDocument> {
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
