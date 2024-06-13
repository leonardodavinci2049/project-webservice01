import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { modelResult } from 'src/core/utls/result/type.result';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): modelResult {
    console.log('Aqui xxxxx', process.env.ENVIRONMENT);
    return new modelResult('Hello World!', true, null, null, 200);
  }
}
