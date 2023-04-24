/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TitleDocument = Title & Document;

@Schema({ timestamps: true, collection: 'titles' })
export class Title {
  @Prop({ required: true })
  idCompetition: string;

  @Prop({ required: true })
  competition: string;

  @Prop({ required: true })
  idTeam: string;

  @Prop({ required: true })
  team: string;

  @Prop({ required: true })
  season: number;
}

const schema = SchemaFactory.createForClass(Title);
schema.index({ idCompetition: 1, idTeam: 1, season: 1 }, { unique: true });

export const TitlesSchema = schema;
