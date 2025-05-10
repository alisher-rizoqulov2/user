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

interface ILabTestsCreationAttr {
  patient_id: number;
  doctor_id: number;
  test_name: string;
  result: string;
  test_date: Date;
}

@Table({ tableName: "lab_tests" })
export class LabTest extends Model<LabTest, ILabTestsCreationAttr> {
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
    type: DataType.STRING,
    allowNull: false,
  })
  test_name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  result: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  test_date: Date;
}
