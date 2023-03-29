import { Atom } from '../schema/atom.schema';
import { Elemental } from '../schema/element.schema';

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

export interface CardDto {
  symbol: CardSymbolType;
  element: Elemental;
  atom: Atom;
}
