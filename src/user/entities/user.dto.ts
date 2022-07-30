import { PartialType } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class CreateUsereDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;
}

export class UpdateCourseDto extends PartialType(CreateUsereDto) {}