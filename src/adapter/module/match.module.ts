import { Module } from '@nestjs/common';
import { MatchController } from '../controller/match.controller';
import { CardModule } from './card.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventsSchema } from 'src/domain/schema/event.schema';
import { EventRepository } from '../repository/event.repository';
import { MatchService } from 'src/application/service/match/match.service';
import { RoundService } from 'src/application/service/match/round.service';
import { PenaltService } from 'src/application/service/match/penalt.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Event.name, schema: EventsSchema }]),
    CardModule
  ],
  controllers: [MatchController],
  providers: [MatchService, RoundService, PenaltService, EventRepository]
})
export class MatchModule {}
