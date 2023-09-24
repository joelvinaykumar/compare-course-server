import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';
import { AppService } from './app.service';

@Controller()
@ApiTags('Health')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectSendGrid() private readonly mailClient: SendGridService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('mail')
  async sendMail() {
    try {
      return await this.mailClient.send({
        to: 'joelvinaykumar@gmail.com',
        subject: 'Greeting Message from NestJS Sendgrid',
        from: 'lavoti.joelkumar@valuebound.com',
        text: 'Hello World from NestJS Sendgrid',
        html: '<h1>Hello World from NestJS Sendgrid</h1>',
      });
    } catch (error) {
      return 'failed' + error.message;
    }
  }
}
