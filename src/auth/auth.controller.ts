import {
  Controller,
  Get,
  UseGuards,
  Request,
  Logger,
  Response,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from './guards/jwt.guard';
import { LinkedInAuthGuard } from './guards/linkedin.guard';
import { ConfigService } from '@nestjs/config';

@Controller()
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly cfgService: ConfigService) {}

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('auth/linkedin')
  @ApiBearerAuth()
  @UseGuards(LinkedInAuthGuard)
  loginWithLinkedIn(@Request() req) {
    Logger.log('here', 'linkedin');
    return req.user;
  }

  @Get('auth/linkedin/callback')
  @ApiBearerAuth()
  @UseGuards(LinkedInAuthGuard)
  loginWithLinkedInCallback(@Request() req, @Response() res) {
    Logger.log(req.user, 'response');
    return res.redirect(
      `${this.cfgService.get('FRONTEND_HOST')}/auth/callback?access_token=${
        req.user?.access_token
      }`,
    );
  }
}
