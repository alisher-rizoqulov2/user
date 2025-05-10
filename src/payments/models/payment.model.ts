import {
    BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Patient } from "../../patients/models/patient.model";

interface IPaymentsCreationAttr {
  patient_id: number;
  amount: number;
  status: string;
  payment_method: string;
}

@Table({ tableName: "payments" })
export class Payment extends Model<Payment, IPaymentsCreationAttr> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;
  @ForeignKey(() => Patient)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  patient_id: number;
  @BelongsTo(() => Patient)
    patient: Patient;

  @Column({
    type: DataType.DECIMAL(10, 2),
    allowNull: false,
  })
  amount: number;

  @Column({
    type: DataType.ENUM("pending", "completed", "failed"),
    allowNull: false,
  })
  status: string;

  @Column({
    type: DataType.ENUM("credit_card", "debit_card", "cash", "bank_transfer"),
    allowNull: false,
  })
  payment_method: string;
}
