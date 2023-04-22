import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Elemental,
  ElementalDocument
} from 'src/domain/schema/game/element.schema';
import { GameRepository } from '../game.repository';

@Injectable()
export class ElementalRepository extends GameRepository<
  Elemental,
  ElementalDocument
> {
  constructor(
    @InjectModel(Elemental.name)
    model: Model<ElementalDocument>
  ) {
    super(model);
  }

  async findFeatureByParent(): Promise<Elemental[]> {
    return this.model.find({});
  }
}
