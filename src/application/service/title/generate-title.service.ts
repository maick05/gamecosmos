import { Injectable, Logger } from '@nestjs/common';
import { CardService } from '../match/card.service';
import { TeamRepository } from 'src/adapter/repository/game/team.repository';
import { CreateTeamDto } from 'src/application/dto/create-team.dto';
import { CountryRepository } from 'src/adapter/repository/location/country.repository';
import { PontuationRepository } from 'src/adapter/repository/game/pontuation.repository';
import { TitleRepository } from 'src/adapter/repository/game/title.repository';
import { Title } from 'src/domain/schema/game/title.schema';
import {
  Competition,
  CompetitionDocument
} from 'src/domain/schema/game/competition.schema';
import { TeamDocument } from 'src/domain/schema/game/team.schema';

@Injectable()
export class GenerateTitleService {
  private readonly logger = new Logger(GenerateTitleService.name);
  private readonly season = 1;

  constructor(
    private readonly titleRepository: TitleRepository,
    private readonly pontsRepository: PontuationRepository
  ) {}

  async generateTitle(
    competition: CompetitionDocument,
    team: TeamDocument
  ): Promise<void> {
    const title = new Title();
    title.competition = competition.name;
    title.idCompetition = competition._id;
    title.idTeam = team._id;
    title.team = team.name;
    title.season = this.season;

    await this.titleRepository.createItem(title);
  }
}
