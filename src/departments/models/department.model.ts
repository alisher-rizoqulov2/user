import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Doctor } from "../../doctor/model/doctor.model";

interface IDepartmentsCreationAttr {
  name: string;
  location: string;
  head_doctor_id: number;
}

@Table({ tableName: "departments" })
export class Department extends Model<Department, IDepartmentsCreationAttr> {
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
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  location: string;
  @ForeignKey(() => Doctor)
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
  })
  head_doctor_id: number;
  @BelongsTo(() => Doctor)
  doctor: Doctor;
}
