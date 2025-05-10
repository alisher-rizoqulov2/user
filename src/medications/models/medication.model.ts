import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IMedicationsCreationAttr {
  name: string;
  description: string;
}

@Table({ tableName: "medications" })
export class Medication extends Model<Medication, IMedicationsCreationAttr> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;
}
