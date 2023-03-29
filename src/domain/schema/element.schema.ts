/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ElementalDocument = Elemental & Document;

@Schema({ timestamps: true, collection: 'elements' })
export class Elemental {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  emoji: string;

  @Prop({ required: true })
  win: string;

  @Prop({ required: true })
  loss: string;
}

const schema = SchemaFactory.createForClass(Elemental);
schema.index({ name: 1 }, { unique: true });
schema.index({ id: 1 }, { unique: true });
schema.index({ emoji: 1 }, { unique: true });

export const ElementsSchema = schema;
