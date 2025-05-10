import { IsString, IsNotEmpty, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateDepartmentDto {
  @ApiProperty({
    example: "Cardiology",
    description: "Department name",
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: "2nd Floor, Room 205",
    description: "Location of the department",
  })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({
    example: 1,
    description: "ID of the head doctor (must exist in doctors table)",
  })
  @IsNumber()
  head_doctor_id: number;
}
