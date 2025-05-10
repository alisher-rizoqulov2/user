import { ApiProperty } from "@nestjs/swagger";
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsBoolean,
  IsEnum,
} from "class-validator";
import { AdminRole } from "../../role";


export class CreateAdminDto {
  @ApiProperty({
    example: "Admin User",
    description: "The full name of the admin",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "admin@example.com",
    description: "The email address of the admin",
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: "hashedpassword123",
    description: "The hashed password for the admin account",
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  hashed_password: string;

  @ApiProperty({
    example: "admin",
    description: "The role of the admin",
    enum: AdminRole,
    required: true,
  })
  @IsEnum(AdminRole)
  @IsNotEmpty()
  role: AdminRole; // ✅ to‘g‘ri type

  @ApiProperty({
    example: true,
    description: "Whether the admin account is active",
    required: false,
    default: true,
  })
  @IsBoolean()
  is_active: boolean = true; // Default value set to true
}
