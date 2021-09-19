import { Controller, Get, Render, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  @Render('App')
  getSveleteApp(@Req() req: Request) {
    return { url: req.url }
  }

  // @Get('/')
  @Get('/hello')
  getHello() {
    return 'Hello World!'
  }
}
