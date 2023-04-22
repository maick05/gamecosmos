/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EnumCompetitionLevel } from 'src/domain/enum/EnumCompetitionLevel';
import { EnumCompetitionRef } from 'src/domain/enum/EnumCompetitionRef';
import { EnumCompetitionType } from 'src/domain/enum/EnumCompetitionType';
import { EnumLocType } from 'src/domain/enum/EnumLocType';

export type CompetitionDocument = Competition & Document;

@Schema({ timestamps: true, collection: 'competitions' })
export class Competition {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  level: EnumCompetitionLevel;

  @Prop({ required: true })
  idLocation: string;

  @Prop({ required: true })
  typeLoc: EnumLocType;

  @Prop({ required: true })
  type: EnumCompetitionType;

  @Prop({ required: true })
  ref: EnumCompetitionRef;

  @Prop({ required: true, default: 0 })
  money: number;

  @Prop({ required: true, default: 1 })
  turns: number;
}

const schema = SchemaFactory.createForClass(Competition);
schema.index({ name: 1 }, { unique: true });
schema.index({ idLocation: 1, type: 1 }, { unique: true });

export const CompetitionsSchema = schema;
