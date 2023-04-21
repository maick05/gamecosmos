/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventDocument = Event & Document;

@Schema({ timestamps: true, collection: 'events' })
export class Event {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  id: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  number: number;

  @Prop({ required: true })
  effect: string;

  @Prop({ required: false })
  usage: string;
}

const schema = SchemaFactory.createForClass(Event);
schema.index({ name: 1 }, { unique: true });
schema.index({ id: 1 }, { unique: true });
schema.index({ number: 1 }, { unique: true });

export const EventsSchema = schema;
