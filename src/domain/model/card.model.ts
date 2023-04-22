import { Atom } from '../schema/game/atom.schema';
import { Elemental } from '../schema/game/element.schema';

export type CardSymbolType =
  | 'A'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | 'J'
  | 'Q'
  | 'K';

export interface CardModel {
  symbol: CardSymbolType;
  element: Elemental;
  atom: Atom;
  originalValue?: number;
  value?: number;
}
