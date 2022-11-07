import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('LoggerMiddleware')

  use(req: Request, res: Response, next: NextFunction): void {
    res.on('finish', () => {
      const text = `${res.statusCode} ${req.method} ${req.path}`
      if (res.statusCode < 400) this.logger.verbose(text)
      else if (res.statusCode < 500) this.logger.warn(text)
      else this.logger.error(text)
    })
    res.on('close', () => {
      if (res.writableFinished) return
      this.logger.error(`${res.statusCode} ${req.method} ${req.path}`)
    })
    next()
  }
}
