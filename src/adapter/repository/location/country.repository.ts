import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Country,
  CountryDocument
} from 'src/domain/schema/location/country.schema';
import { GameRepository } from '../game.repository';

@Injectable()
export class CountryRepository extends GameRepository<
  Country,
  CountryDocument
> {
  constructor(
    @InjectModel(Country.name)
    model: Model<CountryDocument>
  ) {
    super(model);
  }

  async createCountry(country: Country): Promise<CountryDocument> {
    return this.model.create(country);
  }

  async findByName(name: string): Promise<CountryDocument[]> {
    return this.model.find({ name });
  }
}
