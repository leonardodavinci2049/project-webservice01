import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.main/app.module';
import { Logger, ValidationPipe} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
    .addServer('http://localhost:3000/')
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
  //console.log('Aqui xxxxx', process.env.HOST_API);
  Logger.log(`Application is running on:${process.env.HOST_API}`, 'Bootstrap');

  await app.listen(3000);
}
bootstrap();
