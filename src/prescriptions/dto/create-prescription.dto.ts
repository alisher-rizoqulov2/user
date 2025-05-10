import { IsNotEmpty, IsString, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePrescriptionDto {
  @ApiProperty({
    example: 1,
    description: "ID of the patient",
  })
  @IsNumber()
  @IsNotEmpty()
  patient_id: number;

  @ApiProperty({
    example: 5,
    description: "ID of the prescribing doctor",
  })
  @IsNumber()
  @IsNotEmpty()
  doctor_id: number;

  @ApiProperty({
    example: 12,
    description: "ID of the prescribed medication",
  })
  @IsNumber()
  @IsNotEmpty()
  medication_id: bigint;

  @ApiProperty({
    example: "500mg",
    description: "Dosage of the medication",
  })
  @IsString()
  @IsNotEmpty()
  dose: string;

  @ApiProperty({
    example: "Twice a day after meals",
    description: "Frequency of medication intake",
  })
  @IsString()
  @IsNotEmpty()
  frequency: string;
}
