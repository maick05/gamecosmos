import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseRepository } from '@devseeder/nestjs-microservices-commons';
import { Elemental, ElementalDocument } from 'src/domain/schema/element.schema';

@Injectable()
export class ElementalRepository extends MongooseRepository<
  Elemental,
  ElementalDocument
> {
  constructor(
    @InjectModel(Elemental.name)
    model: Model<ElementalDocument>
  ) {
    super(model);
  }

  async findAll(): Promise<Elemental[]> {
    return this.model.find({});
  }
}
