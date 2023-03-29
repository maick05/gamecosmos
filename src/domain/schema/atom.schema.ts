/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AtomDocument = Atom & Document;

@Schema({ timestamps: true, collection: 'atoms' })
export class Atom {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  symbol: string;

  @Prop({ required: true })
  num: number;

  @Prop({ required: true })
  massa: number;

  @Prop({ required: true })
  raio: number;
}

const schema = SchemaFactory.createForClass(Atom);
schema.index({ name: 1 }, { unique: true });
schema.index({ id: 1 }, { unique: true });
schema.index({ emoji: 1 }, { unique: true });

export const AtomsSchema = schema;
