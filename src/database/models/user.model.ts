import bcrypt from "bcrypt";
import type { InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { Table, Column, Model, DataType, BeforeCreate, BeforeUpdate } from "sequelize-typescript";

@Table({
  paranoid: true,
  timestamps: true,
  underscored: true,
  tableName: "users",
})
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  declare id: CreationOptional<string>;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare lastName: string | null;

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
  declare password: string;

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(user: User) {
    if (user.changed("password")) {
      user.password = await bcrypt.hash(user.password, 10);
    }
  }
}
