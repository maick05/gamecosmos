import { Injectable, Logger } from '@nestjs/common';
import { CountryRepository } from 'src/adapter/repository/location/country.repository';
import { FeatureRepository } from 'src/adapter/repository/seed/feature.repository';
import { SeedTeamsDto } from 'src/application/dto/find-feature.dto';
import { FeatureDocument } from 'src/domain/schema/seed/feature.schema';
import { CardService } from '../match/card.service';
import { EnumLocType } from 'src/domain/enum/EnumLocType';
import { EnumFeatureType } from 'src/domain/enum/EnumFeatureType';
import { Team } from 'src/domain/schema/game/team.schema';
import { CountryDocument } from 'src/domain/schema/location/country.schema';
import { TeamRepository } from 'src/adapter/repository/game/team.repository';
import { EnumCompetitionLevel } from 'src/domain/enum/EnumCompetitionLevel';

@Injectable()
export class SeedTeamsService {
  private readonly logger = new Logger(SeedTeamsService.name);

  constructor(
    private readonly featureRepository: FeatureRepository,
    private readonly countryRepository: CountryRepository,
    private readonly cardService: CardService,
    private readonly teamRepository: TeamRepository
  ) {}

  async seedTeams(seedDto: SeedTeamsDto): Promise<void> {
    const parent = await this.featureRepository.findFeature({
      wikiId: seedDto.wikiId,
      wikiTable: seedDto.wikiTable,
      refName: seedDto.refName,
      refType: seedDto.refType,
      featureType: seedDto.featureType,
      name: seedDto.name
    });

    const idParent = parent[0]._id.toString();

    const countries = await this.countryRepository.find({});

    const countrySaved = await this.countryRepository.createCountry({
      id: countries.length + 1,
      typeFeature: EnumFeatureType.FEATURE,
      typeLoc: EnumLocType.COUNTRY,
      idContinent: seedDto.idContinent,
      idSeedFeature: parent[0]._id.toString(),
      name: seedDto.name,
      wikiId: seedDto.wikiId,
      wikiTable: seedDto.wikiTable
    });

    const features = await this.featureRepository.findFeaturesByParent(
      idParent
    );

    await this.generateTeams(features, countrySaved);
  }

  async generateTeams(
    features: FeatureDocument[],
    country: CountryDocument
  ): Promise<void> {
    for await (const feature of features) {
      const cards = await this.cardService.generateTeamCards();
      const team = new Team();
      team.idCountry = country._id;
      team.idSeedFeature = feature._id;
      team.leagueLevel = 1;
      team.preNivel = feature.diameter;
      team.reputation = EnumCompetitionLevel.REGIONAL;
      team.cards = cards;
      await this.teamRepository.createTeam(team);
    }
  }
}