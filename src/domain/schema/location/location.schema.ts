/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LocationDocument = GameLocation & Document;

@Schema({ timestamps: true, collection: 'locations' })
export abstract class GameLocation {
  @Prop({ required: true })
  id: number;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  label: string;

  @Prop({ required: true })
  typeLoc: string;

  @Prop({ required: true })
  typeFeature: string;

  @Prop({ required: false })
  idSeedFeature: string;

  @Prop({ required: true })
  wikiTable: string;

  @Prop({ required: false })
  wikiId: string;
}
