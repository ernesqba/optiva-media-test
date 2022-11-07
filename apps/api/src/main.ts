import { Logger, ValidationPipe, VersioningType } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger'

import { AppModule } from './app.module'
import { FillDb } from './common/utils/fill-db.service'

async function bootstrap() {
  const logger = new Logger('bootstrap')
  const app = await NestFactory.create(AppModule)
  const port = process.env.PORT
  app.enableCors()

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )

  app.setGlobalPrefix('api')
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  })

  const fillDb = app.get<FillDb>(FillDb)
  try {
    await fillDb.fillDb()
  } catch {
    logger.error('Error when try to fill DB')
  }

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Test API')
    .setDescription('Test Rest Api')
    .setVersion('0.1')
    .addBearerAuth()
    .build()

  const swaggerOptions: SwaggerDocumentOptions = {}
  const document = SwaggerModule.createDocument(app, swaggerConfig, swaggerOptions)
  SwaggerModule.setup('api/docs', app, document)

  await app.listen(port)
  logger.log(`Application listening on port ${port}`)
}
bootstrap()
