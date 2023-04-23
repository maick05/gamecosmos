import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { MatchRepository } from 'src/adapter/repository/game/match.repository';
import { RoundRepository } from 'src/adapter/repository/game/round.repository';
import { StageRepository } from 'src/adapter/repository/game/stage.repository';
import { TeamRepository } from 'src/adapter/repository/game/team.repository';
import { CompetitionDocument } from 'src/domain/schema/game/competition.schema';
import { Match } from 'src/domain/schema/game/match.schema';
import { RoundDocument } from 'src/domain/schema/game/round.schema';
import { StageDocument } from 'src/domain/schema/game/stage.schema';
import { TeamDocument } from 'src/domain/schema/game/team.schema';

@Injectable()
export class CreateCupRoundService {
  private readonly logger = new Logger(CreateCupRoundService.name);

  constructor(
    private readonly teamRepository: TeamRepository,
    private readonly roundRepository: RoundRepository,
    private readonly matchRepository: MatchRepository,
    private readonly stageRepository: StageRepository
  ) {}

  async createNextMatchesRound(
    competition: CompetitionDocument,
    round: RoundDocument
  ) {
    await this.roundRepository.updateOneById(round._id, {
      played: true
    });

    let nextRounds = [];

    nextRounds = await this.roundRepository.find(
      {
        idCompetition: competition._id,
        idStage: round.idStage,
        season: round.season,
        sequence: round.sequence + 1
      },
      { _id: 1, sequence: 1, idStage: 1 }
    );

    if (nextRounds.length === 0) {
      await this.stageRepository.updateOneById(round.idStage, { played: true });

      const actualStage = await this.stageRepository.findById(round.idStage, {
        _id: 1,
        name: 1,
        sequence: 1
      });
      const nextStage = await this.stageRepository.find(
        {
          idCompetition: competition._id,
          sequence: actualStage.sequence + 1
        },
        { _id: 1, name: 1, sequence: 1 }
      );

      if (!nextStage) {
        this.logger.warn('No more stages');
        return;
      }

      nextRounds = await this.roundRepository.find(
        {
          idCompetition: competition._id,
          idStage: nextStage[0]._id,
          season: round.season,
          sequence: 1
        },
        { _id: 1, sequence: 1, idStage: 1 }
      );

      if (nextRounds.length === 0) {
        throw new NotFoundException('No more rounds');
      }
    }

    const oldMatches = await this.matchRepository.find({ idRound: round._id });

    for (let i = 0; i < oldMatches.length; i = i + 2) {
      const team1 = await this.teamRepository.findById(oldMatches[i].winnerId, {
        _id: 1,
        name: 1,
        idRound: 1
      });
      const team2 = await this.teamRepository.findById(
        oldMatches[i + 1].winnerId,
        {
          _id: 1,
          name: 1
        }
      );

      await this.createMatch(
        competition,
        team1,
        team2,
        { _id: nextRounds[0].idStage },
        nextRounds[0]
      );
    }
  }

  async createMatch(
    competition: CompetitionDocument,
    teamHome: TeamDocument,
    teamOut: TeamDocument,
    stage: Partial<StageDocument>,
    round: RoundDocument
  ) {
    const match = new Match();
    match.idTeamHome = teamHome._id;
    match.teamHome = teamHome.name;
    match.idTeamOut = teamOut._id;
    match.teamOut = teamOut.name;
    match.idCompetition = competition._id;
    match.idStage = stage._id;
    match.idRound = round._id;
    match.season = 1;

    this.logger.log(`Creating Match - ${teamHome.name} x ${teamOut.name} ...`);

    await this.matchRepository.createMatch(match);
  }
}
