import { Injectable, Logger } from '@nestjs/common';
import { CardService } from './card.service';
import { CardModel } from 'src/domain/model/card.model';
import { EventRepository } from 'src/adapter/repository/game/event.repository';
import { EnumTeamSide } from 'src/domain/enum/EnumTeamSide';
import { Event } from 'src/domain/schema/game/event.schema';
import {
  MatchResultModel,
  MatchRound
} from 'src/domain/model/match-result.model';
import { RoundService } from './round.service';
import { PenaltService } from './penalt.service';
import { MatchDocument } from 'src/domain/schema/game/match.schema';
import { TeamRepository } from 'src/adapter/repository/game/team.repository';
import { MatchRepository } from 'src/adapter/repository/game/match.repository';

@Injectable()
export class PlayMatchService {
  private readonly logger = new Logger(PlayMatchService.name);

  constructor(
    private readonly cardService: CardService,
    private readonly roundService: RoundService,
    private readonly penaltService: PenaltService,
    private readonly eventRepository: EventRepository,
    private readonly teamRepository: TeamRepository,
    private readonly matchRepository: MatchRepository
  ) {}

  async playMatch(match: MatchDocument, penalt = false): Promise<any> {
    this.logger.log(`Starting Match ${match.teamHome} x ${match.teamOut} ...`);

    const teamHome = await this.teamRepository.findByName(match.idTeamHome);
    const teamOut = await this.teamRepository.findByName(match.idTeamOut);

    const result: MatchResultModel = {
      home: {
        id: teamHome[0].id,
        name: teamHome[0].name,
        result: 0,
        totalOriginalValue: 0,
        totalValue: 0
      },
      out: {
        id: teamOut[0].id,
        name: teamOut[0].name,
        result: 0,
        totalOriginalValue: 0,
        totalValue: 0
      },
      rounds: [],
      winnerName: ''
    };

    const events = await this.eventRepository.find({});

    const team1 = [
      ...teamHome[0].cards,
      ...(await this.cardService.generateTeamCards(2))
    ];
    const team2 = [
      ...teamOut[0].cards,
      ...(await this.cardService.generateTeamCards(2))
    ];

    for (let i = 0; i < 7; i++) {
      this.logger.log(`#### ROUND ${i + 1} ####`);

      const resRound = await this.playMatchRound(
        team1[i],
        team2[i],
        i + 1,
        result,
        events
      );

      result.home.totalValue += resRound.cardHome.value;
      result.home.totalOriginalValue += resRound.cardHome.originalValue;
      result.out.totalValue += resRound.cardOut.value;
      result.out.totalOriginalValue += resRound.cardOut.originalValue;

      this.logger.log(
        `ROUND ${i + 1} : ---- ${resRound.cardHome.value} x ${
          resRound.cardOut.value
        } ----`
      );

      result.rounds.push(resRound);
    }

    if (result.home.result == result.out.result) {
      if (penalt) {
        result.penalts = this.penaltService.playMatchPenalts(team1, team2);
        result.winnerName =
          result.penalts.winner == EnumTeamSide.HOME
            ? result.home.name
            : result.out.name;
      } else {
        result.winnerName = 'DRAW';
        result.winnerId = 'DRAW';
        result.winnerRef = EnumTeamSide.DRAW;
      }
    } else {
      if (result.home.result > result.out.result) {
        result.winnerName = result.home.name;
        result.winnerId = result.home.id;
        result.winnerRef = EnumTeamSide.HOME;
      } else {
        result.winnerName = result.out.name;
        result.winnerId = result.out.id;
        result.winnerRef = EnumTeamSide.OUT;
      }
    }

    this.logger.log(
      `Result: ${result.home.name} (${result.home.result}) x ${result.out.name} (${result.out.result}) `
    );

    this.logger.log(`Winner: ${result.winnerName}`);

    await this.updateMatch(match._id, result);

    return result;
  }

  async playMatchRound(
    team1: CardModel,
    team2: CardModel,
    roundNum: number,
    result: MatchResultModel,
    events: Event[]
  ): Promise<MatchRound> {
    const resRound = await this.roundService.playRound(team1, team2, events);

    if (resRound.winner === EnumTeamSide.HOME) result.home.result++;
    if (resRound.winner === EnumTeamSide.OUT) result.out.result++;

    resRound.round = roundNum + 1;

    if (resRound.winner === EnumTeamSide.DRAW) resRound.winnerName = 'DRAW';
    else
      resRound.winnerName =
        resRound.winner === EnumTeamSide.HOME
          ? result.home.name
          : result.out.name;

    return resRound;
  }

  private async updateMatch(
    idMatch: string,
    result: MatchResultModel
  ): Promise<void> {
    await this.logger.log('Updating match...');
    await this.matchRepository.updateOneById(idMatch, {
      resultHome: result.home.result,
      resultOut: result.out.result,
      totalResultHome: {
        totalOriginalValue: result.home.totalOriginalValue,
        totalValue: result.home.totalValue
      },
      totalResultOut: {
        totalOriginalValue: result.out.totalOriginalValue,
        totalValue: result.out.totalValue
      },
      winnerId: result.winnerId,
      winnerName: result.winnerName,
      winnerRef: result.winnerRef,
      rounds: result.rounds,
      penalt: result.penalts
    });

    await this.logger.log('Match Successfully updated!');
  }
}
