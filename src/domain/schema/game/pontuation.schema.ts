/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PontuationDocument = Pontuation & Document;

@Schema({ timestamps: true, collection: 'pontuation' })
export class Pontuation {
  @Prop({ required: true })
  team: string;

  @Prop({ required: true })
  idTeam: string;

  @Prop({ required: true })
  competition: string;

  @Prop({ required: true })
  idCompetition: string;

  @Prop({ required: true })
  season: number;

  @Prop({ required: true })
  position: number;

  @Prop({ required: true, default: 0 })
  points: number;

  @Prop({ required: false, default: 0 })
  matches: number;

  @Prop({ required: false, default: 0 })
  victories: number;

  @Prop({ required: false, default: 0 })
  draws: number;

  @Prop({ required: false, default: 0 })
  looses: number;

  @Prop({ required: false, default: 0 })
  gols: number;

  @Prop({ required: false, default: 0 })
  golsTaken: number;

  @Prop({ required: false, default: 0 })
  balance: number;

  @Prop({ required: false, default: 0 })
  totalValue: number;

  @Prop({ required: false, default: 0 })
  totalOriginalValue: number;
}

const schema = SchemaFactory.createForClass(Pontuation);
schema.index({ idTeam: 1 }, { unique: true });

export const PontuationSchema = schema;
