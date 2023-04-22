import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from 'src/domain/schema/game/event.schema';
import { GameRepository } from '../game.repository';

@Injectable()
export class EventRepository extends GameRepository<Event, EventDocument> {
  constructor(
    @InjectModel(Event.name)
    model: Model<EventDocument>
  ) {
    super(model);
  }

  async findFeatureByParent(): Promise<Event[]> {
    return this.model.find({});
  }
}
