import {
    BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Patient } from "../../patients/models/patient.model";
import { Doctor } from "../../doctor/model/doctor.model";

interface IMedicalRecordsCreationAttr {
  patient_id: number;
  doctor_id: number;
  record: string;
}

@Table({ tableName: "medical_records" })
export class MedicalRecord extends Model<
  MedicalRecord,
  IMedicalRecordsCreationAttr
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

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  record: string;
}
