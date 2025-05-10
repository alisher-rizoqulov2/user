import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { PatientStatus } from "../../role";
import { MedicalRecord } from "../../medical-records/models/medical-record.model";
import { LabTest } from "../../lab-tests/models/lab-test.model";
import { Payment } from "../../payments/models/payment.model";
import { UUID, UUIDV4 } from "sequelize";

// Status uchun enum qiymatlari

interface IPatientCreationAttr {
  first_name: string;
  last_name: string;
  email: string;
  hashed_password: string;
  phone: string;
  dob: Date;
  address: string;
  status: PatientStatus;
}

@Table({ tableName: "patients" })
export class Patient extends Model<Patient, IPatientCreationAttr> {
  @Column({
    type: DataType.BIGINT,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  last_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hashed_password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  dob: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @Column({
    type: DataType.ENUM,
    values: Object.values(PatientStatus), // ENUM qiymatlari kiritildi
    allowNull: false,
    defaultValue: PatientStatus.ACTIVE,
  })
  status: PatientStatus;

  @Column({ defaultValue: true })
  is_active: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  refresh_token: string;
  @Column({
    type: DataType.STRING,
    defaultValue: UUIDV4(),
  })
  activation_link: string;
  @HasMany(() => MedicalRecord)
  medicalRecords: MedicalRecord[];
  @HasMany(() => LabTest)
  labTests: LabTest[];
  @HasMany(() => Payment)
  payment: Payment[];
}
