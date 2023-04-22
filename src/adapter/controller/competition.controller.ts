import { Body, Controller, Post } from '@nestjs/common';
import { CreateCompetitionDto } from 'src/application/dto/create-competition.dto';
import { PlayCompetitionRoundDto } from 'src/application/dto/play-competition-round.dto';
import { CreateCompetitionService } from 'src/application/service/competition/create/create-competition.service';
import { PlayCompetitionRoundService } from 'src/application/service/competition/play/play-competition-round.service';

@Controller()
export class CompetitionController {
  constructor(
    private readonly createService: CreateCompetitionService,
    private readonly playRoundService: PlayCompetitionRoundService
  ) {}

  @Post('/competition/create')
  async createCompetition(
    @Body() createDto: CreateCompetitionDto
  ): Promise<any> {
    await this.createService.createCompetition(createDto);
  }

  @Post('/competition/play/round')
  async playRound(@Body() playDto: PlayCompetitionRoundDto): Promise<any> {
    const response = await this.playRoundService.playByRound(playDto);
    return response;
  }
}
