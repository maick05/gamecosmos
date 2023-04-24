import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException
} from '@nestjs/common';
import { PlayCompetitionRoundDto } from 'src/application/dto/play-competition-round.dto';
import { CompetitionRepository } from 'src/adapter/repository/game/competition.repository';
import { RoundRepository } from 'src/adapter/repository/game/round.repository';
import { EnumCompetitionType } from 'src/domain/enum/EnumCompetitionType';
import { CompetitionDocument } from 'src/domain/schema/game/competition.schema';
import { MatchRepository } from 'src/adapter/repository/game/match.repository';
import { MatchDocument } from 'src/domain/schema/game/match.schema';
import { PlayMatchService } from '../../match/play-match.service';
import { MatchResultModel } from 'src/domain/model/match-result.model';
import { MatchResponse } from 'src/application/dto/match-response.dto';
import { CreateCupRoundService } from '../create/create-cup-round.service';
import { RoundDocument } from 'src/domain/schema/game/round.schema';

@Injectable()
export class PlayCompetitionRoundService {
  private readonly logger = new Logger(PlayCompetitionRoundService.name);

  constructor(
    private readonly competitionRepository: CompetitionRepository,
    private readonly roundRepository: RoundRepository,
    private readonly matchRepository: MatchRepository,
    private readonly playMatchService: PlayMatchService,
    private readonly createRoundService: CreateCupRoundService
  ) {}

  async playByRound(playDto: PlayCompetitionRoundDto): Promise<any> {
    const competition = await this.getCompetition(playDto.competition);

    switch (competition.type) {
      case EnumCompetitionType.CUP:
        return this.playCup(competition);
      default:
        throw new BadRequestException('Type not implemented!');
    }
  }

  private async playCup(competition: CompetitionDocument): Promise<any> {
    const results = [];
    const round = await this.getRound(competition._id);
    const matches = await this.getMatches(round._id);

    for await (const match of matches) {
      const result = await this.playMatchService.playMatch(match, true);
      results.push(this.mapResultMatchToResponse(match._id, result));
    }

    await this.createRoundService.createNextMatchesRound(competition, round);

    return results;
  }

  private async getRound(idCompetition: string): Promise<RoundDocument> {
    const round = await this.roundRepository.find(
      {
        played: false,
        idCompetition: idCompetition
      },
      { sequence: 1, idStage: 1, idCompetition: 1, _id: 1, name: 1 }
    );

    if (round.length === 0) {
      throw new NotFoundException(
        'Round not played not found for this competition'
      );
    }

    return round[0];
  }

  private async getCompetition(
    competition: string
  ): Promise<CompetitionDocument> {
    const competitionRes = await this.competitionRepository.findByName(
      competition
    );

    if (competitionRes.length === 0) {
      throw new NotFoundException('Competition Not Found');
    }
    return competitionRes[0];
  }

  private async getMatches(idRound: string): Promise<MatchDocument[]> {
    const matches = await this.matchRepository.findMatchsByRound(idRound);
    if (matches.length === 0) {
      throw new NotFoundException('Matches not found!');
    }
    return matches;
  }

  private mapResultMatchToResponse(
    idMatch: string,
    result: MatchResultModel
  ): MatchResponse {
    return {
      idMatch: idMatch,
      teamHome: result.home.name,
      resultHome: result.home.result,
      teamOut: result.out.name,
      resultOut: result.out.result,
      winner: result.winnerName,
      totals: {
        totalHome: result.home.totalValue,
        totalOut: result.out.totalValue,
        totalOriginalHome: result.home.totalOriginalValue,
        totalOriginalOut: result.out.totalOriginalValue
      },
      penalts: result.penalts
    };
  }
}
