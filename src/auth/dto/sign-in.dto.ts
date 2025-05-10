import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignInDto {
  @ApiProperty({
    example: "user@example.com",
    description: "Foydalanuvchining email manzili",
  })
  @IsEmail({}, { message: "Email noto‘g‘ri formatda kiritilgan" })
  @IsNotEmpty({ message: "Email bo‘sh bo‘lmasligi kerak" })
  readonly email: string;

  @ApiProperty({
    example: "hashed_password123",
    description: "Foydalanuvchining xeshlangan paroli",
  })
  @IsString({ message: "Parol matn ko‘rinishida bo‘lishi kerak" })
  @IsNotEmpty({ message: "Parol bo‘sh bo‘lmasligi kerak" })
  readonly hashed_password: string;
}
