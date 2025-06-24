import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IUsersCreationAttr {
  first_name: string;
  last_name: string;
  email: string;
  dob: Date;
  address: string;
  jshshr: string;
}

@Table({ tableName: "users", timestamps: false })
export class Users extends Model<Users, IUsersCreationAttr> {
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
    validate: {
      is: /^\d{16}$/,
    },
    unique: true,
  })
  jshshr: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  dob: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  state: boolean;
}
