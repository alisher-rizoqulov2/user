import { Column, DataType, Model, Table } from "sequelize-typescript";
import { AdminRole } from "../../role";

interface IAdminCreationAttr {
  name: string;
  email: string;
  hashed_password: string;
  role: AdminRole;
}

@Table({ tableName: "admins" })
export class Admin extends Model<Admin, IAdminCreationAttr> {
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
  declare name: string;

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
  declare hashed_password: string;

  @Column({
    type: DataType.ENUM(...(Object.values(AdminRole) as string[])),
    allowNull: false,
  })
  role: AdminRole;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  })
  declare is_active: boolean;
  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  declare is_creator: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare refresh_token: string;
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare activation_link: string;
}
