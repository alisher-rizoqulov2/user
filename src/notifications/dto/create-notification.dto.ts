import { IsNotEmpty, IsString, IsBoolean, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateNotificationDto {
  @ApiProperty({
    example: 2,
    description: "ID of the patient receiving the notification",
  })
  @IsNumber()
  @IsNotEmpty()
  patient_id: number;

  @ApiProperty({
    example: "Your lab results are ready.",
    description: "Notification message content",
  })
  @IsString()
  @IsNotEmpty()
  message: string;

  @ApiProperty({
    example: false,
    description: "Whether the notification has been read",
  })
  @IsBoolean()
  @IsNotEmpty()
  read: boolean;
}
