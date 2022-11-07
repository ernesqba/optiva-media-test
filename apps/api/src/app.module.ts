import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LoggerMiddleware } from './common/middlewares/logger.middleware'
import { FillDb } from './common/utils/fill-db.service'
import { TypeormConstantsService } from './common/utils/typeorm.constants'
import { CardModule } from './modules/card/card.module'
import { CardEntity } from './modules/card/utils/card.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: TypeormConstantsService.host,
      port: TypeormConstantsService.port,
      username: TypeormConstantsService.username,
      password: TypeormConstantsService.password,
      database: TypeormConstantsService.dbName,
      synchronize: true,
      logging: false,
      entities: [CardEntity],
    }),
    CardModule,
  ],
  controllers: [AppController],
  providers: [AppService, FillDb],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
