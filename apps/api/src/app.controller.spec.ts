import { Test, TestingModule } from '@nestjs/testing'

import { AppController } from './app.controller'
import { AppService } from './app.service'

describe('AppController', () => {
  let appController: AppController
  let appService: AppService

  let workingMock

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    appController = app.get<AppController>(AppController)
    appService = app.get<AppService>(AppService)

    workingMock = jest.spyOn(appService, 'working')
  })

  describe('working logic', () => {
    let response

    beforeAll(() => {
      workingMock.mockReset()
      workingMock.mockImplementation(() => 'test')

      response = appController.working()
    })

    it('should return a string', () => {
      expect(response).toBe('test')
    })

    it('should call the mocks', () => {
      expect(workingMock).toBeCalledTimes(1)
    })
  })
})
