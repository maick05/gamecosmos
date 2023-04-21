import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseRepository } from '@devseeder/nestjs-microservices-commons';
import { Atom, AtomDocument } from 'src/domain/schema/game/atom.schema';

@Injectable()
export class AtomRepository extends MongooseRepository<Atom, AtomDocument> {
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
