import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  MongooseModule,
  SchemaFactory,
  getConnectionToken,
  getModelToken
} from '@nestjs/mongoose';
import { FeatureRepository } from 'src/adapter/repository/seed/feature.repository';
import { Feature, FeatureSchema } from 'src/domain/schema/seed/feature.schema';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      connectionName: 'seedConnection',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        uri: config.get<string>('database.mongodb.seed-connection')
      })
    }),
    MongooseModule.forFeature(
      [
        {
          name: Feature.name,
          schema: FeatureSchema
        }
      ],
      'seedConnection'
    )
  ],
  controllers: [],
  providers: [FeatureRepository],
  exports: [FeatureRepository]
})
export class FeatureModule {}
