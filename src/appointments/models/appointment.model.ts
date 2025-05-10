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

interface IAppointmentsCreationAttr {
  patient_id: number;
  doctor_id: number;
  appointment_date: Date;
  status: string;
}

@Table({ tableName: "appointments" })
export class Appointment extends Model<Appointment, IAppointmentsCreationAttr> {
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
    type: DataType.DATE,
    allowNull: false,
  })
  appointment_date: Date;

  @Column({
    type: DataType.ENUM("scheduled", "completed", "canceled", "no_show"),
    allowNull: false,
  })
  status: string;
}
