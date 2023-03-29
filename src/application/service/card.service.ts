/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { AtomRepository } from 'src/adapter/repository/atom.repository';
import { ElementalRepository } from 'src/adapter/repository/elemental.repository';
import { CardDto, CardSymbolType } from 'src/domain/dto/card.dto';
import { Atom } from 'src/domain/schema/atom.schema';
import { Elemental } from 'src/domain/schema/element.schema';
import { NumberHelper } from '../helper/number.helper';

@Injectable()
export class CardService {
  constructor(
    private readonly atomRepository: AtomRepository,
    private readonly elementalRepository: ElementalRepository
  ) {}
  async generateTeamCards(): Promise<CardDto[]> {
    const arr = [];
    const atoms = await this.atomRepository.findAll();
    const elements = await this.elementalRepository.findAll();
    for (let i = 0; i < 5; i++)
      arr.push(await this.generateCard(atoms, elements));
    return arr;
  }

  async generateCard(atoms: Atom[], elements: Elemental[]): Promise<CardDto> {
    return {
      symbol: this.getSymbol(),
      atom: await this.getAtom(atoms),
      element: await this.getElement(elements)
    };
  }

  private getSymbol(): CardSymbolType {
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
    return symbols[pos];
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
