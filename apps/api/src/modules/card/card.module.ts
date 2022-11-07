import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { CardController } from './card.controller'
import { CardService } from './card.service'
import { CardRepository } from './utils/card.repository'

@Module({
  imports: [HttpModule],
  controllers: [CardController],
  providers: [CardService, CardRepository],
  exports: [CardService],
})
export class CardModule {}
