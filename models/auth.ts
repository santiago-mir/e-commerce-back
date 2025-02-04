import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "db/sequelize";

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
  static async findByEmail(email: string): Promise<Auth> {
    const authFound = await Auth.findOne({
      where: { email },
    });
    return authFound;
  }
  static async updateCodeAndDate(
    email: string,
    newDate?: Date,
    newCode?: number
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
    validationCode: { type: DataTypes.INTEGER, allowNull: true },
    expireDate: { type: DataTypes.DATE, allowNull: true },
    // foreign key
    UserId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "Auth",
  }
);
