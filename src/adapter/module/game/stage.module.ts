import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StageRepository } from 'src/adapter/repository/game/stage.repository';
import { Stage, StagesSchema } from 'src/domain/schema/game/stage.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Stage.name, schema: StagesSchema }])
  ],
  controllers: [],
  providers: [StageRepository],
  exports: [StageRepository]
})
export class StageModule {}
