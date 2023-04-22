import { Body, Controller, Post } from '@nestjs/common';
import { CreateTeamDto } from 'src/application/dto/create-team.dto';
import { SeedTeamsDto } from 'src/application/dto/find-feature.dto';
import { SeedTeamsService } from 'src/application/service/seed/seed-teams.service';
import { CreateTeamService } from 'src/application/service/team/create-team.service';

@Controller()
export class GenerateController {
  constructor(
    private readonly seedTeamService: SeedTeamsService,
    private readonly saveTeamService: CreateTeamService
  ) {}

  @Post('/seed/team')
  async seedTeams(@Body() seedDto: SeedTeamsDto): Promise<any> {
    await this.seedTeamService.seedTeams(seedDto);
  }

  @Post('/create/team')
  async createTeam(@Body() teamDto: CreateTeamDto): Promise<any> {
    await this.saveTeamService.saveTeam(teamDto);
  }
}
