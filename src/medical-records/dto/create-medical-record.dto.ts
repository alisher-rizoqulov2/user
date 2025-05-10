import { IsNotEmpty, IsString, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateMedicalRecordDto {
  @ApiProperty({
    example: 1,
    description: "ID of the patient",
  })
  @IsNumber()
  @IsNotEmpty()
  patient_id: number;

  @ApiProperty({
    example: 4,
    description: "ID of the doctor who created the record",
  })
  @IsNumber()
  @IsNotEmpty()
  doctor_id: number;

  @ApiProperty({
    example: "Patient was diagnosed with seasonal flu and prescribed rest.",
    description: "Detailed medical record or notes",
  })
  @IsString()
  @IsNotEmpty()
  record: string;
}
