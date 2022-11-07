import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  working(): string {
    return `The api is working, current time: ${new Date().toUTCString()}`
  }
}
