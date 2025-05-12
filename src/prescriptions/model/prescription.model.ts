import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Doctor } from "../../doctor/model/doctor.model";
import { Patient } from "../../patients/models/patient.model";
import { Medication } from "../../medications/models/medication.model";
import { ApiProperty } from "@nestjs/swagger";

interface IPrescriptionsCreationAttr {
  patient_id: number;
  doctor_id: number;
  medication_id: bigint;
  dose: string;
  frequency: string;
}

@Table({ tableName: "prescriptions" })
export class Prescription extends Model<
  Prescription,
  IPrescriptionsCreationAttr
> {
  @ApiProperty({ example: 1, description: "Buyurtmaning ID raqami" })
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

  @ApiProperty({ example: 5, description: "Shifokor ID raqami (foreign key)" })
  @ForeignKey(() => Doctor)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  doctor_id: number;

  @BelongsTo(() => Doctor)
  doctor: Doctor;

  @ApiProperty({
    example: 3,
    description: "Dori vositasi ID raqami (foreign key)",
  })
  @ForeignKey(() => Medication)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  medication_id: bigint;

  @BelongsTo(() => Medication)
  medication: Medication;

  @ApiProperty({ example: "500mg", description: "Dori dozasi" })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  dose: string;

  @ApiProperty({
    example: "Kuniga 2 marta",
    description: "Qanday tezlikda qabul qilinishi",
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  frequency: string;
}
