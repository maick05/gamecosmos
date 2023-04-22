/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Schema as OldSchema } from 'mongoose';
export type FeatureDocument = Feature & Document;

@Schema({ timestamps: true, collection: 'features' })
export class Feature {
  @Prop({ required: true })
  wikiId: string;

  @Prop({ required: true })
  wikiTable: string;

  @Prop({ required: true })
  refName: string;

  @Prop({ required: true })
  refType: string;

  @Prop({ required: true })
  featureType: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  diameter: number;

  @Prop({ required: true, type: Object })
  coordinates: Coordinate;

  @Prop({ required: false })
  quad: string;

  @Prop({ required: false })
  additionalInfo: string[];

  @Prop({ required: false })
  externalRef: ExternalReference[];

  @Prop({ required: false })
  alias: string[];

  @Prop({ required: false })
  idRegion: string;

  @Prop({ required: false })
  idParent: string;
}

export interface ExternalReference {
  source: string;
  link: string;
  fields: string[];
  id: string;
}

export interface Coordinate {
  lat: number;
  long: number;
}

export const FeatureSchemaOld = new OldSchema({
  wikiId: { type: String, required: true },
  wikiTable: { type: String, required: true },
  refName: { type: String, required: true },
  refType: { type: String, required: true },
  featureType: { type: String, required: true },
  name: { type: String, required: true },
  diameter: { type: Number, required: false },
  quad: { type: String, required: false },
  additionalInfo: { type: [String], required: false },
  alias: { type: [String], required: false },
  idRegion: { type: String, required: false },
  idParent: { type: String, required: false }
});

export const FeatureSchema = SchemaFactory.createForClass(Feature);
