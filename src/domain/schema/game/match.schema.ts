/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { MatchRound, PenaltResult } from 'src/domain/model/match-result.model';

export interface TotalResult {
  totalOriginalValue: number;
  totalValue: number;
}

export type MatchDocument = Match & Document;

@Schema({ timestamps: true, collection: 'matches' })
export class Match {
  @Prop({ required: true })
  idTeamHome: string;

  @Prop({ required: true })
  teamHome: string;

  @Prop({ required: true })
  idTeamOut: string;

  @Prop({ required: true })
  teamOut: string;

  @Prop({ required: true })
  idCompetition: string;

  @Prop({ required: true })
  idStage: string;

  @Prop({ required: true })
  idRound: string;

  @Prop({ required: true, default: 1 })
  season: number;

  @Prop({ required: false })
  resultHome: number;

  @Prop({ required: false })
  resultOut: number;

  @Prop({ required: false, type: Object })
  totalResultHome: TotalResult;

  @Prop({ required: false, type: Object })
  totalResultOut: TotalResult;

  @Prop({ required: false })
  winnerId: string;

  @Prop({ required: false })
  winnerName: string;

  @Prop({ required: false })
  winnerRef: number;

  @Prop({ required: false })
  rounds: MatchRound[];

  @Prop({ required: false, type: Object })
  penalts?: PenaltResult;
}

const schema = SchemaFactory.createForClass(Match);
schema.index(
  { idTeamHome: 1, idTeamOut: 1, idRound: 1, idStage: 1, season: 1 },
  { unique: true }
);

export const MatchsSchema = schema;
