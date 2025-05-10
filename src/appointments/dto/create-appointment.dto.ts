import { IsNotEmpty, IsString, IsNumber, IsDateString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAppointmentDto {
  @ApiProperty({
    example: 10,
    description: "ID of the patient booking the appointment",
  })
  @IsNumber()
  @IsNotEmpty()
  patient_id: number;

  @ApiProperty({
    example: 3,
    description: "ID of the doctor for the appointment",
  })
  @IsNumber()
  @IsNotEmpty()
  doctor_id: number;

  @ApiProperty({
    example: "2025-05-10T14:00:00Z",
    description: "Date and time of the appointment (ISO 8601 format)",
  })
  @IsDateString()
  @IsNotEmpty()
  appointment_date: Date;

  @ApiProperty({
    example: "scheduled",
    description:
      "Status of the appointment (e.g., scheduled, completed, canceled)",
  })
  @IsString()
  @IsNotEmpty()
  status: string;
}
