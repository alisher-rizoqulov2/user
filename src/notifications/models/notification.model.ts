import {
    BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import { Patient } from "../../patients/models/patient.model";

interface INotificationsCreationAttr {
  patient_id: number;
  message: string;
  read: boolean;
}

@Table({ tableName: "notifications" })
export class Notification extends Model<
  Notification,
  INotificationsCreationAttr
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

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  message: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  read: boolean;
}
