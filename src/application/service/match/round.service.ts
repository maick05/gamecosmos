import { Injectable, Logger } from '@nestjs/common';
import { CardService } from './card.service';
import { Elemental } from 'src/domain/schema/game/element.schema';
import { CardModel } from 'src/domain/model/card.model';
import { Atom } from 'src/domain/schema/game/atom.schema';
import { EnumTeamSide } from 'src/domain/enum/EnumTeamSide';
import { Event } from 'src/domain/schema/game/event.schema';
import { MatchRound } from 'src/domain/model/match-result.model';
import { NumberHelper } from 'src/application/helper/number.helper';

@Injectable()
export class RoundService {
  private readonly logger = new Logger(RoundService.name);

  constructor(private readonly cardService: CardService) {}

  async playRound(
    card1: CardModel,
    card2: CardModel,
    events: Event[]
  ): Promise<MatchRound> {
    this.checkCardA(card1, card2);

    const resElement = this.checkWinnerElement(card1.element, card2.element);

    if (resElement === EnumTeamSide.DRAW) {
      this.logger.log('No element winner...');
      return this.returnRoundResult(card1, card2, events);
    }

    this.logger.log('Calculating Atom Value...');

    if (resElement === EnumTeamSide.HOME)
      card1.value = this.calculateAtomValue(card1);
    else card2.value = this.calculateAtomValue(card2);

    return this.returnRoundResult(card1, card2, events);
  }

  private checkCardA(card1: CardModel, card2: CardModel): void {
    if (card1.symbol === 'A' && card2.symbol == 'K') card1.value = 14;
    if (card2.symbol === 'A' && card1.symbol == 'K') card2.value = 14;
  }

  private async returnRoundResult(
    card1: CardModel,
    card2: CardModel,
    events: Event[]
  ): Promise<Promise<MatchRound>> {
    this.logger.log('Rolling Event for Home...');
    const event1 = await this.rollEventDice(card1, card2, events);
    this.logger.log('Rolling Event for Out...');
    const event2 = await this.rollEventDice(card2, card1, events);

    let winner;

    if (card1.value === card2.value) winner = EnumTeamSide.DRAW;
    else
      winner = card1.value > card2.value ? EnumTeamSide.HOME : EnumTeamSide.OUT;

    return {
      cardHome: card1,
      cardOut: card2,
      winner,
      eventHome: event1,
      eventOut: event2
    };
  }

  private checkWinnerElement(element1: Elemental, element2: Elemental): number {
    if (element1.win == element2.name) return EnumTeamSide.HOME;
    else if (element2.win == element1.name) return EnumTeamSide.OUT;
    else return EnumTeamSide.DRAW;
  }

  private calculateAtomValue(card: CardModel): number {
    return Number(
      (card.value + card.value * (this.getAtomValue(card.atom) / 100)).toFixed(
        2
      )
    );
  }

  private getAtomValue(atom: Atom): number {
    const numAtom = NumberHelper.generateRandomNumber(1, atom.num);
    const raio = NumberHelper.generateRandomNumber(1, atom.raio) / atom.massa;
    return numAtom + raio;
  }

  private async rollEventDice(
    cardWinner: CardModel,
    cardAdv: CardModel,
    events: Event[]
  ): Promise<Event | null> {
    this.logger.log('Rolling event dice...');

    const diceNumber = NumberHelper.generateRandomNumber(1, 100);
    const hitEvent = events.filter((ev) => ev.number === diceNumber);

    if (hitEvent.length === 0) {
      this.logger.log('No event...');
      return null;
    }

    const eventRound = hitEvent[0];

    this.logger.log(`Event: ${eventRound.name}`);
    this.logger.log(`Effect: ${eventRound.effect}`);

    switch (eventRound.code) {
      case 'supernova':
        const newPercent = NumberHelper.generateRandomNumber(1, 100);
        cardWinner.value += cardWinner.value * (newPercent / 100);
        break;

      case 'emaranhamento_quantico':
        cardWinner.symbol = cardAdv.symbol;
        cardWinner.value = cardAdv.value;
        const newAtomValue = this.calculateAtomValue(cardWinner);
        cardWinner.value = newAtomValue;
        break;

      case 'big_crunch':
        cardWinner.value = this.calculateAtomValue(cardWinner);
        break;

      case 'tunelamento_quantico':
        const { symbol, value } = this.cardService.getSymbol();
        this.logger.log(`New Value: ${value}`);

        if (value >= cardWinner.value) {
          cardWinner.symbol = symbol;
          cardWinner.value = value;
        } else {
          cardAdv.symbol = symbol;
          cardAdv.value = this.calculateAtomValue(cardAdv);
        }
        break;

      default:
        eventRound.effect = eventRound.effect.replace('.', '');
        const percent = Number(eventRound.effect.replace('%', '')) / 100;
        cardWinner.value += cardWinner.value * percent;
        break;
    }

    this.logger.log(`Home Value: ${cardWinner.value}`);
    this.logger.log(`Out Value: ${cardAdv.value}`);

    return eventRound;
  }
}
