import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMedicationDto {
  @ApiProperty({
    example: "Paracetamol",
    description: "Dori nomi",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "Og‘riqni kamaytirish va isitmani tushirish uchun ishlatiladi",
    description: "Dori haqida qisqacha izoh",
  })
  @IsString()
  description: string;
}
