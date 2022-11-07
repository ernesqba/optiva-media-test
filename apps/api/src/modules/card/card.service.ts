import { HttpService } from '@nestjs/axios'
import { Injectable, Logger } from '@nestjs/common'
import { firstValueFrom } from 'rxjs'

import { DatabaseException } from '../../common/filters/database-exception.filter'
import { AppConstantsService } from '../../common/utils/app.constants'
import { CardDto } from './dtos/card.dto'
import { CardFilterDto } from './dtos/extra.dto'
import { CardRepository } from './utils/card.repository'

@Injectable()
export class CardService {
  private readonly logger = new Logger('CardService')

  constructor(private readonly httpService: HttpService, private readonly cardRepository: CardRepository) {}

  async getCardsFromExternalDb(): Promise<CardDto[]> {
    const sets = AppConstantsService.sets
    let cards = []

    for (const set of sets) {
      let data
      let page = 1
      do {
        data = await firstValueFrom(
          this.httpService.get(
            `https://api.scryfall.com/cards/search?q=e:${set}&include_extras=true&include_variations=true&unique=cards&page=${page++}`,
          ),
        ).then((data) => data.data)
        cards = cards.concat(data.data)
      } while (data.has_more)
    }
    const filteredCards: CardDto[] = cards.map((card) => {
      return {
        name: card.name,
        language: card.lang,
        releaseDate: card.released_at,
        images: card.image_uris,
        set: card.set_name,
        legalities: card.legalities,
      }
    })

    return filteredCards
  }

  async createCards(cards: CardDto[]): Promise<CardDto> {
    try {
      return (await this.cardRepository.createCards(cards).execute()).raw
    } catch (error) {
      this.logger.error(`Error inside createCards logic: ${error.message}`)
      throw new DatabaseException()
    }
  }

  async getCards(filters: CardFilterDto): Promise<CardDto[]> {
    try {
      return await this.cardRepository.getCards(filters).getRawMany()
    } catch (error) {
      this.logger.error(`Error inside getCards logic: ${error.message}`)
      throw new DatabaseException()
    }
  }

  async deleteCards(): Promise<void> {
    try {
      await this.cardRepository.deleteCards().execute()
    } catch (error) {
      this.logger.error(`Error inside deleteCards logic: ${error.message}`)
      throw new DatabaseException()
    }
  }
}
