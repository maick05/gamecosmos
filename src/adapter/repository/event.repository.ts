import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseRepository } from '@devseeder/nestjs-microservices-commons';
import { Event, EventDocument } from 'src/domain/schema/event.schema';

@Injectable()
export class EventRepository extends MongooseRepository<Event, EventDocument> {
  constructor(
    @InjectModel(Event.name)
    model: Model<EventDocument>
  ) {
    super(model);
  }

  async findAll(): Promise<Event[]> {
    return this.model.find({});
  }
}
