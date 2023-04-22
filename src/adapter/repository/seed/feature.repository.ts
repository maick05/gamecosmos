import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { MongooseRepository } from '@devseeder/nestjs-microservices-commons';
import { InjectModel, getModelToken } from '@nestjs/mongoose';
import {
  Feature,
  FeatureDocument
} from 'src/domain/schema/seed/feature.schema';
import { FindFeatureDto } from 'src/application/dto/find-feature.dto';

@Injectable()
export class FeatureRepository extends MongooseRepository<
  Feature,
  FeatureDocument
> {
  constructor(
    @InjectModel(Feature.name, 'seedConnection')
    model: Model<FeatureDocument>
  ) {
    super(model);
  }

  async findFeature(featureDto: FindFeatureDto): Promise<FeatureDocument[]> {
    return this.model.find(featureDto, { _id: 1, name: 1 });
  }

  async findFeaturesByParent(idParent: string): Promise<FeatureDocument[]> {
    return this.model.find(
      { idParent, additionalInfo: { $ne: 'Satellite' } },
      { _id: 1, name: 1, featureType: 1, diameter: 1 }
    );
  }
}
