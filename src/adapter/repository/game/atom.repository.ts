import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Atom, AtomDocument } from 'src/domain/schema/game/atom.schema';
import { GameRepository } from '../game.repository';

@Injectable()
export class AtomRepository extends GameRepository<Atom, AtomDocument> {
  constructor(
    @InjectModel(Atom.name)
    model: Model<AtomDocument>
  ) {
    super(model);
  }

  async findFeatureByParent(): Promise<Atom[]> {
    return this.model.find({});
  }
}
