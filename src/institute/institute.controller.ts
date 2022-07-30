import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { InstituteService } from './institute.service';
import { CreateInstituteDto } from './dto/create-institute.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';
import { FilterInstituteDto } from './dto/filter-institute.dto';

@Controller('institute')
@ApiTags("Institute")
@ApiBearerAuth()
// @UseGuards(JwtAuthGuard)
export class CourseController {
  constructor(private readonly instituteService: InstituteService) {}

  @Post()
  create(@Body() input: CreateInstituteDto) {
    return this.instituteService.create(input);
  }

  @Get()
  findAll(@Query() query?: FilterInstituteDto) {
    return this.instituteService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instituteService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() input: UpdateInstituteDto) {
    return this.instituteService.update(id, input);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instituteService.remove(id);
  }
}
