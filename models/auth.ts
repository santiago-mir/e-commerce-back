import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  where,
} from "sequelize";
import { sequelize } from "db/index";

export class Auth extends Model<
  InferAttributes<Auth>,
  InferCreationAttributes<Auth>
> {
  declare id: number;
  declare email: string;
  declare validationCode: number;
  declare expireDate: Date;
  declare UserId: number;

  static async findOrCreateAuth(
    email: string,
    userId: number,
    code: number,
    expireDate: Date
  ): Promise<[Auth, Boolean]> {
    const [auth, created] = await Auth.findOrCreate({
      where: { email },
      defaults: {
        email,
        validationCode: code,
        expireDate,
        UserId: userId,
      },
    });
    return [auth, created];
  }
  static async updateCodeAndDate(
    newCode: number,
    newDate: Date,
    email: string
  ) {
    const res = await Auth.update(
      {
        validationCode: newCode,
        expireDate: newDate,
      },
      {
        where: { email: email },
      }
    );
    return res;
  }
}
Auth.init(
  {
    // auto generated id
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email: { type: DataTypes.STRING, allowNull: false },
    validationCode: { type: DataTypes.INTEGER, allowNull: false },
    expireDate: { type: DataTypes.DATE, allowNull: false },
    // foreign key
    UserId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "Auth",
  }
);
