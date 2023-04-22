import { Module } from '@nestjs/common';
import { MatchController } from '../../controller/match.controller';
import { CardModule } from './card.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventsSchema } from 'src/domain/schema/game/event.schema';
import { EventRepository } from '../../repository/game/event.repository';
import { PlayMatchService } from 'src/application/service/match/play-match.service';
import { RoundService } from 'src/application/service/match/round.service';
import { PenaltService } from 'src/application/service/match/penalt.service';
import { Match, MatchsSchema } from 'src/domain/schema/game/match.schema';
import { MatchRepository } from 'src/adapter/repository/game/match.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventsSchema },
      { name: Match.name, schema: MatchsSchema }
    ]),
    CardModule
  ],
  controllers: [MatchController],
  providers: [
    PlayMatchService,
    RoundService,
    PenaltService,
    EventRepository,
    MatchRepository
  ],
  exports: [
    PlayMatchService,
    RoundService,
    PenaltService,
    EventRepository,
    MatchRepository
  ]
})
export class MatchModule {}
