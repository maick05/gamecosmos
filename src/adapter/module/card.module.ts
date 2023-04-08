import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardService } from 'src/application/service/match/card.service';
import { Atom, AtomsSchema } from 'src/domain/schema/atom.schema';
import { Elemental, ElementsSchema } from 'src/domain/schema/element.schema';
import { AtomRepository } from '../repository/atom.repository';
import { ElementalRepository } from '../repository/elemental.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Elemental.name, schema: ElementsSchema },
      { name: Atom.name, schema: AtomsSchema }
    ])
  ],
  controllers: [],
  providers: [CardService, AtomRepository, ElementalRepository],
  exports: [CardService, AtomRepository, ElementalRepository]
})
export class CardModule {}
