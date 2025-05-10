import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { DoctorStatus } from "../../role";
import { Department } from "../../departments/models/department.model";



interface IDoctorCreationAttr {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  specialty: string;
  status: DoctorStatus;
  hashed_password:string;
}

@Table({ tableName: "doctors" })
export class Doctor extends Model<Doctor, IDoctorCreationAttr> {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare first_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare last_name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare specialty: string;

  // Keyin modelda:
  @Column({
    type: DataType.ENUM,
    values: Object.values(DoctorStatus),
    allowNull: false,
  })
  status: DoctorStatus;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare hashed_password: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  declare is_active: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare refresh_token: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  activation_link: string;

  @HasMany(() => Department)
  department: Department[];
}
