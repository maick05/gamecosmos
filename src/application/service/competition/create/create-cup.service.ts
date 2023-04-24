import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CompetitionRepository } from 'src/adapter/repository/game/competition.repository';
import { RoundRepository } from 'src/adapter/repository/game/round.repository';
import { StageRepository } from 'src/adapter/repository/game/stage.repository';
import { TeamRepository } from 'src/adapter/repository/game/team.repository';
import { CountryRepository } from 'src/adapter/repository/location/country.repository';
import { CreateCompetitionDto } from 'src/application/dto/create-competition.dto';
import { ArrayHelper } from 'src/application/helper/array.helper';
import { EnumCompetitionLevel } from 'src/domain/enum/EnumCompetitionLevel';
import { EnumCompetitionRef } from 'src/domain/enum/EnumCompetitionRef';
import { EnumCompetitionType } from 'src/domain/enum/EnumCompetitionType';
import { EnumLocType } from 'src/domain/enum/EnumLocType';
import { EnumStageType } from 'src/domain/enum/EnumStageType';
import {
  Competition,
  CompetitionDocument
} from 'src/domain/schema/game/competition.schema';
import { Round, RoundDocument } from 'src/domain/schema/game/round.schema';
import { Stage, StageDocument } from 'src/domain/schema/game/stage.schema';
import { TeamDocument } from 'src/domain/schema/game/team.schema';
import { CreateCupRoundService } from './create-cup-round.service';

@Injectable()
export class CreateCupService {
  private readonly logger = new Logger(CreateCupService.name);

  constructor(
    private readonly teamRepository: TeamRepository,
    private readonly countryRepository: CountryRepository,
    private readonly competitionRepository: CompetitionRepository,
    private readonly stageRepository: StageRepository,
    private readonly roundRepository: RoundRepository,
    private readonly createRoundCupService: CreateCupRoundService
  ) {}

  async createCup(createDto: CreateCompetitionDto): Promise<any> {
    this.logger.log(`Searching country "${createDto.location}"...`);
    const country = await this.countryRepository.findByName(createDto.location);

    if (country.length === 0) {
      throw new NotFoundException('Country not found!');
    }

    const competition = new Competition();
    competition.idLocation = country[0]._id;
    competition.typeLoc = EnumLocType.COUNTRY;
    competition.level = EnumCompetitionLevel.NACIONAL;
    competition.name = `Copa ${country[0].label}`;
    competition.ref = EnumCompetitionRef.NATIONAL_CUP;
    competition.type = EnumCompetitionType.CUP;

    this.logger.log(`Creating Competition "Copa ${country[0].label}"...`);

    const saved = await this.competitionRepository.createItem(competition);

    this.logger.log(`Competition "Copa ${country[0].label}" created!`);

    const teams = await this.getTeams(competition.idLocation);

    const stages = await this.createStages(saved, teams.length);

    await this.createRounds(saved, teams, stages);

    this.logger.log('Competition successfully created!');
  }

  private async getTeams(idCountry: string) {
    this.logger.log('Searching teams...');
    const teams = await this.teamRepository.findTeamsByCountry(idCountry);
    return ArrayHelper.shuffleArray(teams);
  }

  private async createStages(
    competition: CompetitionDocument,
    teamsCount: number
  ): Promise<StageDocument[]> {
    this.logger.log('Creating stages...');

    const arrStage = [];
    const stageNames = {
      16: 'Oitavas de Final',
      8: 'Quartas de Final',
      4: 'Semi-final',
      2: 'Final'
    };

    let i = teamsCount;
    let cont = 0;
    do {
      cont++;
      i = i / 2;
      const stage = new Stage();
      stage.id = cont;
      stage.idCompetition = competition._id;
      stage.name = Object.keys(stageNames).includes(String(i))
        ? stageNames[i]
        : `${cont}ª Fase`;
      stage.season = 1;
      stage.sequence = cont;
      stage.type = EnumStageType.KNOCKOUT;

      const stageSaved = await this.stageRepository.createItem(stage);

      arrStage.push(stageSaved);
    } while (i !== 2);

    return arrStage;
  }

  private async createRounds(
    competition: CompetitionDocument,
    teams: TeamDocument[],
    stages: StageDocument[]
  ) {
    this.logger.log('Creating rounds...');

    let seq = 0;

    for await (const stage of stages) {
      seq++;
      const round = new Round();
      round.id = seq;
      round.idCompetition = competition._id;
      round.idStage = stage._id;
      round.name = stage.name;
      round.season = 1;
      round.sequence = 1;
      round.turn = 1;

      const savedRound = await this.roundRepository.createItem(round);

      if (seq > 1) continue;

      await this.createMatches(competition, teams, stage, savedRound);
    }
  }

  private async createMatches(
    competition: CompetitionDocument,
    teams: TeamDocument[],
    stage: StageDocument,
    round: RoundDocument
  ) {
    for (let i = 0; i < teams.length; i = i + 2) {
      const teamHome = teams[i];
      const teamOut = teams[i + 1];

      await this.createRoundCupService.createMatch(
        competition,
        teamHome,
        teamOut,
        stage,
        round
      );
    }
  }
}
