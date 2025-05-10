import { IsNotEmpty, IsString, IsNumber, IsDateString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateLabTestDto {
  @ApiProperty({
    example: 1,
    description: "ID of the patient",
  })
  @IsNumber()
  @IsNotEmpty()
  patient_id: number;

  @ApiProperty({
    example: 3,
    description: "ID of the doctor who ordered the test",
  })
  @IsNumber()
  @IsNotEmpty()
  doctor_id: number;

  @ApiProperty({
    example: "Blood Test",
    description: "Name of the lab test",
  })
  @IsString()
  @IsNotEmpty()
  test_name: string;

  @ApiProperty({
    example: "Hemoglobin level is normal",
    description: "Result of the lab test",
  })
  @IsString()
  @IsNotEmpty()
  result: string;

  @ApiProperty({
    example: "2025-05-07T10:30:00Z",
    description: "Date and time when the test was conducted (ISO format)",
  })
  @IsDateString()
  @IsNotEmpty()
  test_date: Date;
}
