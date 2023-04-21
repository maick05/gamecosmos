import { Body, Controller, Post } from '@nestjs/common';
import { SeedTeamsDto } from 'src/application/dto/find-feature.dto';
import { SeedTeamsService } from 'src/application/service/seed/seed-teams.service';

@Controller()
export class GenerateController {
  constructor(private readonly seedTeamService: SeedTeamsService) {}

  @Post('/seed/team')
  async seedTeams(@Body() seedDto: SeedTeamsDto): Promise<any> {
    await this.seedTeamService.seedTeams(seedDto);
  }
}
