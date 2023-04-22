import { EnumCompetitionRef } from 'src/domain/enum/EnumCompetitionRef';
import { EnumCompetitionType } from 'src/domain/enum/EnumCompetitionType';

export interface CreateCompetitionDto {
  location: string;
  type: EnumCompetitionType;
  ref: EnumCompetitionRef;
}
