import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { CreateCompetitionDto } from 'src/application/dto/create-competition.dto';
import { EnumCompetitionRef } from 'src/domain/enum/EnumCompetitionRef';
import { CreateCupService } from './create-cup.service';

@Injectable()
export class CreateCompetitionService {
  private readonly logger = new Logger(CreateCompetitionService.name);

  constructor(private readonly createCupService: CreateCupService) {}

  async createCompetition(createDto: CreateCompetitionDto): Promise<void> {
    switch (createDto.ref) {
      case EnumCompetitionRef.NATIONAL_CUP:
        await this.createCupService.createCup(createDto);
        break;
      default:
        throw new BadRequestException('Ref Type not implemented!');
    }
  }
}
