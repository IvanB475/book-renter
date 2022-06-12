import { Controller, Get } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    'summary': 'a welcome message',
    'description': 'this is an api we dont need, but hey it is always nice to feel welcomed'
  })
  getHello(): string {
    return this.appService.getHello();
  }
}
