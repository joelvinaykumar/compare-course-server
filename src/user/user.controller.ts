import {
  Controller,
  Body,
  Request,
  UseGuards,
  Get,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

import { LocalAuthGuard } from '../auth/guards/local-auth.guard';
import { CreateUsereDto } from './entities/user.dto';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('signup')
  signUp(@Body() input: CreateUsereDto) {
    return this.userService.signUp(input);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async logIn(@Request() req) {
    return await req.user;
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  findUsers() {
    return this.userService.findUsers();
  }
}
