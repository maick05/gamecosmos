/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RoundDocument = Round & Document;

@Schema({ timestamps: true, collection: 'rounds' })
export class Round {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  sequence: number;

  @Prop({ required: true, default: 1 })
  turn: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  idStage: string;

  @Prop({ required: true })
  idCompetition: string;

  @Prop({ required: true, default: 1 })
  season: number;

  @Prop({ required: true, default: false })
  played: boolean;
}

const schema = SchemaFactory.createForClass(Round);
schema.index({ idStage: 1, id: 1 }, { unique: true });
schema.index({ idStage: 1, name: 1 }, { unique: true });

export const RoundsSchema = schema;
