/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { GameLocation } from './location.schema';

export type CountryDocument = Country & Document;

export class Country extends GameLocation {
  @Prop({ required: true })
  idContinent: string;
}

const schema = SchemaFactory.createForClass(Country);
schema.index({ id: 1, name: 1, typeLoc: 1 }, { unique: true });

export const CountrySchema = schema;
