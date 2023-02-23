import { IsString, IsNotEmpty, IsDateString, IsEmail, IsNumber } from "class-validator";

export class IntervalScheduleEmail {
  @IsEmail()
  recipient: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  milliseconds: number;
}
