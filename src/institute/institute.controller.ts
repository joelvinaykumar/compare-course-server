import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
  Put,
  HttpCode,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { InstituteService } from './institute.service';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';
import {
  FilterInstituteDto,
  FilterInstituteLiteDto,
} from './dto/filter-institute.dto';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/entities/user.enum';

@Controller('institute')
@ApiTags('Institute')
@ApiBearerAuth()
export class CourseController {
  constructor(private readonly instituteService: InstituteService) {}

  @Post()
  @Roles(UserRole.SuperAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() input: CreateInstituteDto) {
    return this.instituteService.create(input);
  }

  @Get()
  @Roles(UserRole.SuperAdmin, UserRole.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll(@Query() query?: FilterInstituteDto) {
    return this.instituteService.findAll(query);
  }

  @Get('lite')
  findAllLite(@Query() query?: FilterInstituteLiteDto) {
    return this.instituteService.findAllLite(query);
  }

  @Get('suggestions')
  @Roles(UserRole.SuperAdmin, UserRole.User)
  @UseGuards(RolesGuard)
  getSuggestions(@Query() query?: FilterInstituteDto) {
    return this.instituteService.getSuggestions(query);
  }

  @Get(':id')
  @Roles(UserRole.SuperAdmin, UserRole.Admin)
  findOne(@Param('id') id: string) {
    return this.instituteService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SuperAdmin, UserRole.Admin)
  update(@Param('id') id: string, @Body() input: UpdateInstituteDto) {
    return this.instituteService.update(id, input);
  }

  @Put(':id/activate')
  @HttpCode(200)
  @Roles(UserRole.SuperAdmin)
  reActivcate(@Param('id') id: string) {
    return this.instituteService.reActivate(id);
  }

  @Delete(':id')
  @HttpCode(204)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.SuperAdmin)
  deActivcate(@Param('id') id: string) {
    return this.instituteService.deActivate(id);
  }
}
