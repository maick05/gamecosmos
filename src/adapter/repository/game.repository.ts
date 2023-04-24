import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  MongooseDocumentID,
  MongooseRepository
} from '@devseeder/nestjs-microservices-commons';

@Injectable()
export abstract class GameRepository<
  Entity,
  EntDocument
> extends MongooseRepository<Entity, EntDocument> {
  constructor(model: Model<EntDocument>) {
    super(model);
  }

  async findByName(name: string): Promise<EntDocument[]> {
    return this.model.find({ name });
  }

  async updateOneById(
    id: MongooseDocumentID,
    data: Partial<EntDocument>
  ): Promise<void> {
    await this.model.updateOne(
      { _id: id },
      {
        $set: data
      }
    );
  }

  async createItem(item: Entity): Promise<EntDocument> {
    return this.model.create(item);
  }
}
