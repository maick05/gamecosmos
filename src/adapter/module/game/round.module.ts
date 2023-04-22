import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoundRepository } from 'src/adapter/repository/game/round.repository';
import { Round, RoundsSchema } from 'src/domain/schema/game/round.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Round.name, schema: RoundsSchema }])
  ],
  controllers: [],
  providers: [RoundRepository],
  exports: [RoundRepository]
})
export class RoundModule {}
