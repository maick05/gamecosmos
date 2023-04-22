import { Body, Controller, Post } from '@nestjs/common';
import { CreateCompetitionDto } from 'src/application/dto/create-competition.dto';
import { CreateCompetitionService } from 'src/application/service/competition/create-competition.service';

@Controller()
export class CompetitionController {
  constructor(private readonly createService: CreateCompetitionService) {}

  @Post('/competition/create')
  async createCompetition(
    @Body() createDto: CreateCompetitionDto
  ): Promise<any> {
    await this.createService.createCompetition(createDto);
  }
}
