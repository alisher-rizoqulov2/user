import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsDateString,
  IsEnum,
} from "class-validator";
import { PatientStatus } from "../../role";

export class CreatePatientDto {
  @ApiProperty({
    example: "John",
    description: "Bemorning ismi",
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    example: "Doe",
    description: "Bemorning familiyasi",
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    example: "john.doe@example.com",
    description: "Bemorning elektron pochta manzili",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: "hashedpassword123",
    description: "Bemorning xashlangan paroli",
  })
  @IsString()
  @IsNotEmpty()
  hashed_password: string;

  @ApiProperty({
    example: "+1234567890",
    description: "Bemorning telefon raqami",
  })
  @IsPhoneNumber() // Agar kerak bo'lsa, hududni ko'rsating: @IsPhoneNumber('US')
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    example: "1990-01-01",
    description: "Bemorning tug'ilgan sanasi YYYY-MM-DD formatida",
  })
  @IsDateString()
  @IsNotEmpty()
  dob: Date; // Bu yerda dobni Date sifatida o'zgartiramiz

  @ApiProperty({
    example: "123 Main St, City, Country",
    description: "Bemorning manzili",
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    example: "active",
    description: "Bemorning holati",
    enum: PatientStatus, // Bu yerda enum bo'lishi kerak
  })
  @IsEnum(PatientStatus)
  @IsNotEmpty()
  status: PatientStatus; // Bu yerda PatientStatus enum'ini qo'llash kerak
}
