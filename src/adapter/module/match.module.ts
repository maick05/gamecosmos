import { Module } from '@nestjs/common';
import { MatchService } from '../../application/service/match.service';
import { MatchController } from '../controller/match.controller';
import { CardModule } from './card.module';

@Module({
  imports: [CardModule],
  controllers: [MatchController],
  providers: [MatchService]
})
export class MatchModule {}
