import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuration';
import { GameModule } from './game/game.module';
import { SeedPlanetsModule } from './seed/seed-planets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    GameModule,
    SeedPlanetsModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {}
