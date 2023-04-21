/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { AtomRepository } from 'src/adapter/repository/game/atom.repository';
import { ElementalRepository } from 'src/adapter/repository/game/elemental.repository';
import { CardDto, CardSymbolType } from 'src/domain/dto/card.dto';
import { Atom } from 'src/domain/schema/game/atom.schema';
import { Elemental } from 'src/domain/schema/game/element.schema';
import { NumberHelper } from '../../helper/number.helper';

@Injectable()
export class CardService {
  constructor(
    private readonly atomRepository: AtomRepository,
    private readonly elementalRepository: ElementalRepository
  ) {}

  async generateTeamCards(numCards = 5): Promise<CardDto[]> {
    const arr = [];
    const atoms = await this.atomRepository.findFeatureByParent();
    const elements = await this.elementalRepository.find({});
    for (let i = 0; i < numCards; i++)
      arr.push(await this.generateCard(atoms, elements));
    return arr;
  }

  async generateCard(atoms: Atom[], elements: Elemental[]): Promise<CardDto> {
    const { symbol, value } = this.getSymbol();
    return {
      symbol,
      atom: await this.getAtom(atoms),
      element: await this.getElement(elements),
      originalValue: value,
      value
    };
  }

  getSymbol(): { symbol: CardSymbolType; value: number } {
    const symbols: CardSymbolType[] = [
      'A',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'J',
      'Q',
      'K'
    ];
    const pos = NumberHelper.generateRandomNumber(0, 12);
    return { symbol: symbols[pos], value: this.translateSymbol(symbols[pos]) };
  }

  translateSymbol(symbol: string) {
    switch (symbol) {
      case 'A':
        return 1;
      case 'J':
        return 11;
      case 'Q':
        return 12;
      case 'K':
        return 13;
      default:
        return Number(symbol);
    }
  }

  private getAtom(atoms: Atom[]): Atom {
    const pos = NumberHelper.generateRandomNumber(0, atoms.length - 1);
    return atoms[pos];
  }

  private getElement(elements: Elemental[]): Elemental {
    const pos = NumberHelper.generateRandomNumber(0, elements.length - 1);
    return elements[pos];
  }
}
