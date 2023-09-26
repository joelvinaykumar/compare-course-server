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
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Roles } from '../auth/roles.decorator';
import { User } from '../auth/user.decorator';
import { UserRole } from '../user/entities/user.enum';
import { CourseService } from './course.service';
import {
  CreateCourseDto,
  UpdateCourseDto,
  FilterCourseDto,
  FilterCourseLiteDto,
} from './dto';

@Controller('course')
@ApiTags('Course')
@ApiBearerAuth()
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.Admin)
  create(@Body() input: CreateCourseDto) {
    return this.courseService.create(input);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(@User() user: any, @Query() query?: FilterCourseDto) {
    return this.courseService.findAll(user, query);
  }

  @Get('public')
  findAllPublic(@Query() query?: FilterCourseDto) {
    return this.courseService.findAllPublic(query);
  }

  @Get('lite')
  findAllLite(@User() user: any, @Query() query?: FilterCourseLiteDto) {
    return this.courseService.findAllLite(user, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() input: UpdateCourseDto) {
    return this.courseService.update(id, input);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
