import { Injectable, Logger } from '@nestjs/common';
import { ArrayHelper } from 'src/application/helper/array.helper';
import { NumberHelper } from 'src/application/helper/number.helper';
import { CardModel } from 'src/domain/model/card.model';
import { PenaltResult } from 'src/domain/model/match-result.model';
import { EnumTeamSide } from 'src/domain/enum/EnumTeamSide';

@Injectable()
export class PenaltService {
  private readonly logger = new Logger(PenaltService.name);

  playMatchPenalts(team1: CardModel[], team2: CardModel[]): PenaltResult {
    this.logger.log('Starting penalts...');

    const resultPenalts: PenaltResult = {
      home: 0,
      out: 0,
      winner: 0,
      logValues: []
    };

    const random1 = ArrayHelper.shuffleArray(team1);
    const random2 = ArrayHelper.shuffleArray(team2);

    for (let i = 0; i < 7; i++) {
      this.logger.log(`Penalt Round - ${i + 1}`);
      this.playPenalt(random1[i], random2[i], i + 1, resultPenalts);
    }

    this.logger.log(`Result: ${resultPenalts.home} x ${resultPenalts.out}`);

    if (resultPenalts.home === resultPenalts.out) {
      this.logger.log('Draw, starting final penalt...');

      resultPenalts.winner = NumberHelper.generateRandomNumber(1, 2);
      resultPenalts.logValues.push({
        home: resultPenalts.winner === EnumTeamSide.HOME ? 1 : 0,
        out: resultPenalts.winner === EnumTeamSide.OUT ? 1 : 0,
        seq: 8,
        finalPenalt: true
      });
    } else {
      resultPenalts.winner =
        resultPenalts.home > resultPenalts.out
          ? EnumTeamSide.HOME
          : EnumTeamSide.OUT;
    }

    this.logger.log(`Winner: ${resultPenalts.winner}`);

    return resultPenalts;
  }

  playPenalt(
    team1: CardModel,
    team2: CardModel,
    i: number,
    resultPenalts: PenaltResult
  ): void {
    const rand1 = NumberHelper.generateRandomNumber(1, team1.value);
    const rand2 = NumberHelper.generateRandomNumber(1, team2.value);

    this.logger.log(`Round Result: ${rand1} x ${rand2}`);

    if (rand1 > rand2) resultPenalts.home++;
    if (rand2 > rand1) resultPenalts.out++;

    this.logger.log(
      `Penalts Results until now: ${resultPenalts.home} x ${resultPenalts.out}`
    );

    resultPenalts.logValues.push({
      home: rand1,
      out: rand2,
      seq: i,
      finalPenalt: false
    });
  }
}
