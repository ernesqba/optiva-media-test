import { HttpModule } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'

import { CardController } from './card.controller'
import { CardService } from './card.service'
import { CardRepository } from './utils/card.repository'

describe('CardController', () => {
  let cardController: CardController
  let cardService: CardService

  let getCardsMock

  beforeAll(async () => {
    const card: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [CardController],
      providers: [CardService, CardRepository],
    }).compile()

    cardController = card.get<CardController>(CardController)
    cardService = card.get<CardService>(CardService)

    getCardsMock = jest.spyOn(cardService, 'getCards')
  })

  describe('getCardById logic', () => {
    let response

    beforeAll(async () => {
      jest.resetAllMocks()
      getCardsMock.mockImplementation(() => Promise.resolve([]))

      response = await cardController.getCardById({ id: 1 })
    })

    it('should return an answer', () => {
      expect(response).toBeUndefined()
    })

    it('should call the mocks', () => {
      expect(getCardsMock).toBeCalledTimes(1)
    })
  })

  describe('getCardByName logic', () => {
    let response

    beforeAll(async () => {
      jest.resetAllMocks()
      getCardsMock.mockImplementation(() => Promise.resolve([]))

      response = await cardController.getCardByName({ name: '' })
    })

    it('should return an answer', () => {
      expect(response).toBeUndefined()
    })

    it('should call the mocks', () => {
      expect(getCardsMock).toBeCalledTimes(1)
    })
  })

  describe('getCardsByLegality logic', () => {
    let response

    beforeAll(async () => {
      jest.resetAllMocks()
      getCardsMock.mockImplementation(() => Promise.resolve([]))

      response = await cardController.getCardsByLegality({ mode: '' })
    })

    it('should return an answer', () => {
      expect(response).toStrictEqual([])
    })

    it('should call the mocks', () => {
      expect(getCardsMock).toBeCalledTimes(1)
    })
  })

  describe('getCardsBySet logic', () => {
    let response

    beforeAll(async () => {
      jest.resetAllMocks()
      getCardsMock.mockImplementation(() => Promise.resolve([]))

      response = await cardController.getCardsBySet({ name: '' })
    })

    it('should return an answer', () => {
      expect(response).toStrictEqual([])
    })

    it('should call the mocks', () => {
      expect(getCardsMock).toBeCalledTimes(1)
    })
  })
})
