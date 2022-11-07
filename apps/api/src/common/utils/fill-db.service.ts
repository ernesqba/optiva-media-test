import { Injectable, Logger } from '@nestjs/common'

import { CardService } from '../../modules/card/card.service'

@Injectable()
export class FillDb {
  private readonly logger = new Logger('FillDb')

  constructor(private readonly cardService: CardService) {}

  async fillDb(): Promise<void> {
    const cards = await this.cardService.getCardsFromExternalDb()
    await this.cardService.deleteCards()
    await this.cardService.createCards(cards)

    this.logger.verbose('Filled Db')
  }
}
