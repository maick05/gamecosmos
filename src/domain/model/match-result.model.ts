import { CardModel } from './card.model';
import { Event } from '../schema/game/event.schema';
import { EnumTeamSide } from '../enum/EnumTeamSide';

export interface MatchResultModel {
  home: TeamMatch;
  out: TeamMatch;
  winnerName: string;
  rounds: MatchRound[];
  penalts?: PenaltResult;
}

export interface TeamMatch {
  name: string;
  result: number;
  totalOriginalValue: number;
  totalValue: number;
}

export interface MatchRound {
  round?: number;
  cardHome: CardModel;
  cardOut: CardModel;
  eventHome: Event | null;
  eventOut: Event | null;
  winner: number;
  winnerName?: string;
}

export interface PenaltResult {
  home: number;
  out: number;
  winner?: EnumTeamSide;
  logValues?: LogPenalt[];
}

export interface LogPenalt {
  seq: number;
  home: number;
  out: number;
  finalPenalt: boolean;
}
