import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsPhoneNumber,
  IsEnum,
} from "class-validator";
import { DoctorSpecialty, DoctorStatus } from "../../role";

export class CreateDoctorDto {
  @ApiProperty({
    example: "Sarah",
    description: "The first name of the doctor",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    example: "Smith",
    description: "The last name of the doctor",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: "sarah.smith@example.com",
    description: "The email address of the doctor",
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: "+998901234567",
    description: "The phone number of the doctor",
    required: true,
  })
  @IsPhoneNumber() // Optionally specify region: @IsPhoneNumber('UZ')
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: "cardiology",
    description: "The specialty of the doctor",
    enum: DoctorSpecialty,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  // If using enum specialties:
  // @IsEnum(DoctorSpecialty)
  specialty: string;

  @ApiProperty({
    example: "on_leave",
    description: "The status of the doctor",
    enum: DoctorStatus,
    required: true,
  })
  @IsEnum(DoctorStatus)
  @IsNotEmpty()
  status: DoctorStatus;
  @ApiProperty({
    example: "hashedpassword123",
    description: "The hashed password for the admin account",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  hashed_password: string;
}
