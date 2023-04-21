/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CardDto } from 'src/domain/dto/card.dto';

export type TeamDocument = Team & Document;

@Schema({ timestamps: true, collection: 'teams' })
export class Team {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  idCountry: string;

  @Prop({ required: false })
  preNivel: number;

  @Prop({ required: false })
  idSeedFeature: string;

  @Prop({ required: true })
  reputation: number;

  @Prop({ required: true, default: 1 })
  leagueLevel: number;

  @Prop({ required: true, default: 0 })
  money: number;

  @Prop({ required: true })
  cards: CardDto[];
}

const schema = SchemaFactory.createForClass(Team);
schema.index({ name: 1 }, { unique: true });

export const TeamsSchema = schema;
