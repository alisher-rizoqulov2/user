import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Patient } from "../../patients/models/patient.model";
import { ApiProperty } from "@nestjs/swagger";

interface IPaymentsCreationAttr {
  patient_id: number;
  amount: number;
  status: string;
  payment_method: string;
}

@Table({ tableName: "payments" })
export class Payment extends Model<Payment, IPaymentsCreationAttr> {
  @ApiProperty({ example: 1, description: "To'lov ID raqami" })
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ApiProperty({ example: 10, description: "Bemor ID raqami (foreign key)" })
  @ForeignKey(() => Patient)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  patient_id: number;

  @BelongsTo(() => Patient)
  patient: Patient;

  @ApiProperty({ example: 150000.5, description: "To'lov summasi" })
  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  amount: number;

  @ApiProperty({
    example: "completed",
    description: "To'lov holati: pending | completed | failed",
  })
  @Column({
    type: DataType.ENUM("pending", "completed", "failed"),
    allowNull: false,
  })
  status: string;

  @ApiProperty({
    example: "credit_card",
    description:
      "To'lov usuli: credit_card | debit_card | cash | bank_transfer",
  })
  @Column({
    type: DataType.ENUM("credit_card", "debit_card", "cash", "bank_transfer"),
    allowNull: false,
  })
  payment_method: string;
}
