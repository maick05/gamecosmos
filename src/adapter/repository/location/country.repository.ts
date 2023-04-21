import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongooseRepository } from '@devseeder/nestjs-microservices-commons';
import {
  Country,
  CountryDocument
} from 'src/domain/schema/location/country.schema';

@Injectable()
export class CountryRepository extends MongooseRepository<
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
}
