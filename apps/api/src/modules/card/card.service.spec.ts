import { HttpModule } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import * as rxjs from 'rxjs'

import { DatabaseException } from '../../common/filters/database-exception.filter'
import { CardService } from './card.service'
import { CardRepository } from './utils/card.repository'

describe('CardService', () => {
  let cardService: CardService
  let cardRepository: CardRepository

  let firstValueFromMock
  let createCardsMock
  let getCardsMock
  let deleteCardsMock

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [CardService, CardRepository],
    }).compile()

    cardService = module.get<CardService>(CardService)
    cardRepository = module.get<CardRepository>(CardRepository)

    firstValueFromMock = jest.spyOn(rxjs, 'firstValueFrom')
    createCardsMock = jest.spyOn(cardRepository, 'createCards')
    getCardsMock = jest.spyOn(cardRepository, 'getCards')
    deleteCardsMock = jest.spyOn(cardRepository, 'deleteCards')
  })

  describe('getCardsFromExternalDb logic', () => {
    let response

    describe('success case', () => {
      beforeAll(async () => {
        jest.resetAllMocks()
        firstValueFromMock.mockImplementation(() =>
          Promise.resolve({
            data: {
              has_more: false,
              data: { name: '', lang: '', released_at: '', image_uris: '', set_name: '', legalities: '' },
            },
          }),
        )
        response = await cardService.getCardsFromExternalDb()
      })

      it('should return an answer', () => {
        expect(response[0]).toStrictEqual({
          name: '',
          language: '',
          releaseDate: '',
          images: '',
          set: '',
          legalities: '',
        })
      })

      it('should call the mocks', () => {
        expect(firstValueFromMock).toBeCalledTimes(3)
      })
    })
  })

  describe('createCards logic', () => {
    let response

    describe('success case', () => {
      beforeAll(async () => {
        jest.resetAllMocks()
        createCardsMock.mockImplementation(() => ({ execute: () => Promise.resolve({ raw: '' }) }))
        response = await cardService.createCards({} as any)
      })

      it('should return an answer', () => {
        expect(typeof response).toBe('string')
      })

      it('should call the mocks', () => {
        expect(createCardsMock).toBeCalledTimes(1)
      })
    })

    describe('failed case', () => {
      beforeAll(async () => {
        jest.resetAllMocks()
        createCardsMock.mockImplementation(() => ({ execute: () => Promise.reject(new Error('error')) }))

        try {
          await cardService.createCards({} as any)
        } catch (error) {
          response = error
        }
      })

      it('should return an answer', () => {
        expect(response).toBeInstanceOf(DatabaseException)
      })

      it('should call the mocks', () => {
        expect(createCardsMock).toBeCalledTimes(1)
      })
    })
  })

  describe('getCards logic', () => {
    let response

    describe('success case', () => {
      beforeAll(async () => {
        jest.resetAllMocks()
        getCardsMock.mockImplementation(() => ({ getRawMany: () => Promise.resolve() }))
        response = await cardService.getCards({})
      })

      it('should return an answer', () => {
        expect(response).toBeUndefined()
      })

      it('should call the mocks', () => {
        expect(getCardsMock).toBeCalledTimes(1)
      })
    })

    describe('failed case', () => {
      beforeAll(async () => {
        jest.resetAllMocks()
        getCardsMock.mockImplementation(() => ({ getRawMany: () => Promise.reject(new Error('error')) }))

        try {
          await cardService.getCards({})
        } catch (error) {
          response = error
        }
      })

      it('should return an answer', () => {
        expect(response).toBeInstanceOf(DatabaseException)
      })

      it('should call the mocks', () => {
        expect(getCardsMock).toBeCalledTimes(1)
      })
    })
  })

  describe('deleteCards logic', () => {
    let response

    describe('success case', () => {
      beforeAll(async () => {
        jest.resetAllMocks()
        deleteCardsMock.mockImplementation(() => ({ execute: () => Promise.resolve() }))
        response = await cardService.deleteCards()
      })

      it('should return an answer', () => {
        expect(response).toBeUndefined()
      })

      it('should call the mocks', () => {
        expect(deleteCardsMock).toBeCalledTimes(1)
      })
    })

    describe('failed case', () => {
      beforeAll(async () => {
        jest.resetAllMocks()
        deleteCardsMock.mockImplementation(() => ({ execute: () => Promise.reject(new Error('error')) }))

        try {
          await cardService.deleteCards()
        } catch (error) {
          response = error
        }
      })

      it('should return an answer', () => {
        expect(response).toBeInstanceOf(DatabaseException)
      })

      it('should call the mocks', () => {
        expect(deleteCardsMock).toBeCalledTimes(1)
      })
    })
  })
})
