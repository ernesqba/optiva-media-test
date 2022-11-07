import { Test, TestingModule } from '@nestjs/testing'

import { AppService } from './app.service'

describe('AppService', () => {
  let appService: AppService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile()

    appService = module.get<AppService>(AppService)
  })

  describe('working logic', () => {
    let response

    beforeAll(() => {
      response = appService.working()
    })

    it('should return a string', () => {
      expect(typeof response).toBe('string')
    })
  })
})
