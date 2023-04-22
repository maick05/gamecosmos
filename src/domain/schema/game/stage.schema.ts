/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { EnumStageType } from 'src/domain/enum/EnumStageType';

export type StageDocument = Stage & Document;

@Schema({ timestamps: true, collection: 'Stages' })
export class Stage {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  idCompetition: string;

  @Prop({ required: true, default: 1 })
  season: number;

  @Prop({ required: true })
  type: EnumStageType;

  @Prop({ required: true })
  sequence: number;
}

const schema = SchemaFactory.createForClass(Stage);
schema.index({ idCompetition: 1, id: 1 }, { unique: true });
schema.index({ idCompetition: 1, name: 1 }, { unique: true });

export const StagesSchema = schema;
