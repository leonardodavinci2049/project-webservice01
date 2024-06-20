import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.main/app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { envs } from './core/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('WEBSERVICE');
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove properties that do not have decorators
      transform: true, // transform payload to DTO instances
      forbidNonWhitelisted: true, // throw error if payload has properties that do not have decorators
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Webservice ComSuporte')
    .setDescription('Webservice para suporte de sistemas WinERP')
    .setVersion('1.0')
    .addServer(`${envs.APP_HOST_API}:${envs.APP_PORT}`)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth()in your controller!
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(envs.APP_PORT);
  logger.log(`Application is running on port: ${envs.APP_PORT}`);
}
bootstrap();
