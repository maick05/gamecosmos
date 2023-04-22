import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CardService } from '../match/card.service';
import { TeamRepository } from 'src/adapter/repository/game/team.repository';
import { Team } from 'src/domain/schema/game/team.schema';
import { CreateTeamDto } from 'src/application/dto/create-team.dto';
import { EnumCompetitionLevel } from 'src/domain/enum/EnumCompetitionLevel';
import { CountryRepository } from 'src/adapter/repository/location/country.repository';
import { EnumLocType } from 'src/domain/enum/EnumLocType';

@Injectable()
export class CreateTeamService {
  private readonly logger = new Logger(CreateTeamService.name);

  constructor(
    private readonly cardService: CardService,
    private readonly teamRepository: TeamRepository,
    private readonly countryRepository: CountryRepository
  ) {}

  async saveTeam(createDto: CreateTeamDto): Promise<void> {
    this.logger.log(`Creating team "${createDto.name}"...`);

    const country = await this.countryRepository.find(
      {
        country: createDto.name,
        typeLoc: EnumLocType.COUNTRY
      },
      { _id: 1 }
    );

    if (country.length === 0) {
      throw new NotFoundException('Country not found!');
    }

    const team = new Team();
    team.name = createDto.name;
    team.idCountry = country[0]._id.toString();
    team.leagueLevel = 1;
    team.money = 0;
    team.preNivel = createDto.preNivel;
    team.reputation = EnumCompetitionLevel.REGIONAL;
    team.cards = await this.cardService.generateTeamCards();

    await this.teamRepository.createTeam(team);

    this.logger.log(`Team "${createDto.name}" successfully created!`);
  }
}
