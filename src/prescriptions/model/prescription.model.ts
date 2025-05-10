import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Doctor } from "../../doctor/model/doctor.model";
import { Patient } from "../../patients/models/patient.model";
import { Medication } from "../../medications/models/medication.model";

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

  @ForeignKey(() => Doctor)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  doctor_id: number;
  @BelongsTo(() => Doctor)
  doctor: Doctor;

  @ForeignKey(() => Medication)
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  medication_id: bigint;
  @BelongsTo(() => Medication)
  medication: Medication;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  dose: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  frequency: string;
}
