import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Title, TitleDocument } from 'src/domain/schema/game/title.schema';
import { GameRepository } from '../game.repository';

@Injectable()
export class TitleRepository extends GameRepository<Title, TitleDocument> {
  constructor(
    @InjectModel(Title.name)
    model: Model<TitleDocument>
  ) {
    super(model);
  }
}
