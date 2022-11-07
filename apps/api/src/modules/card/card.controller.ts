import { Controller, Get, Param } from '@nestjs/common'
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger'

import { CardService } from './card.service'
import { CardDto } from './dtos/card.dto'
import { IdParamDto, ModeParamDto, NameParamDto } from './dtos/extra.dto'

@ApiTags('Card')
@Controller('card')
@ApiExtraModels(CardDto)
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get('set/:name')
  @ApiResponse({ type: CardDto, isArray: true })
  getCardsBySet(@Param() param: NameParamDto): Promise<CardDto[]> {
    return this.cardService.getCards({ set: param.name })
  }

  @Get('legality/:mode')
  @ApiResponse({ type: CardDto, isArray: true })
  getCardsByLegality(@Param() param: ModeParamDto): Promise<CardDto[]> {
    return this.cardService.getCards({ legality: param.mode })
  }

  @Get('name/:name')
  @ApiResponse({ type: CardDto })
  async getCardByName(@Param() param: NameParamDto): Promise<CardDto> {
    return (await this.cardService.getCards({ name: param.name }))[0]
  }

  @Get('/:id')
  @ApiResponse({ type: CardDto })
  async getCardById(@Param() param: IdParamDto): Promise<CardDto> {
    return (await this.cardService.getCards({ id: param.id }))[0]
  }
}
