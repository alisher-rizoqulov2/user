import { IsNotEmpty, IsString, IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreatePaymentDto {
  @ApiProperty({
    example: 7,
    description: "ID of the patient making the payment",
  })
  @IsNumber()
  @IsNotEmpty()
  patient_id: number;

  @ApiProperty({
    example: 150000,
    description: "Total payment amount in UZS",
  })
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @ApiProperty({
    example: "pending",
    description: "Payment status (e.g., paid, pending, failed)",
  })
  @IsString()
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    example: "credit_card",
    description: "Method of payment (e.g., credit_card, cash, transfer)",
  })
  @IsString()
  @IsNotEmpty()
  payment_method: string;
}
