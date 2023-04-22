import { PenaltResult } from 'src/domain/model/match-result.model';

export class MatchResponse {
  teamHome: string;
  resultHome: number;
  teamOut: string;
  resultOut: number;
  totals: {
    totalHome: number;
    totalOut: number;
    totalOriginalHome: number;
    totalOriginalOut: number;
  };
  penalts?: PenaltResult;
}
