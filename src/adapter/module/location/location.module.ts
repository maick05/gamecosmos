import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CountryRepository } from 'src/adapter/repository/location/country.repository';
import {
  Country,
  CountrySchema
} from 'src/domain/schema/location/country.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }])
  ],
  controllers: [],
  providers: [CountryRepository],
  exports: [CountryRepository]
})
export class LocationModule {}
