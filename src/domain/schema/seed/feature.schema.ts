/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FeatureDocument = Feature & Document;

export class Coordinate {
  lat: number;
  long: number;
}

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

  @Prop({ required: true, type: Coordinate })
  coordinates: object;

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

const schema = SchemaFactory.createForClass(Feature);

export const FeatureSchema = schema;
