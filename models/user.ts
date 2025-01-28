import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { sequelize } from "db/index";

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: number;
  declare name: string;
  declare email: string;
  declare address: CreationOptional<string>;

  static async findOrCreateUser(
    email: string,
    userName: string
  ): Promise<User> {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: {
        name: userName,
      },
    });
    return user;
  }
  static async findByEmail(email: string): Promise<User> {
    const userFound = await User.findOne({
      where: {
        email,
      },
    });
    return userFound;
  }
  static async updateUserInfo(
    currentEmail: string,
    fieldsToUpdate: Partial<{
      newName: string;
      newEmail: string;
      newAddress: string;
    }>
  ) {
    const res = await User.update(
      {
        name: fieldsToUpdate.newName,
        email: fieldsToUpdate.newEmail,
        address: fieldsToUpdate.newAddress,
      },
      {
        where: { email: currentEmail },
      }
    );
    return res;
  }
}
User.init(
  {
    // auto generated id
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: true },
  },
  {
    sequelize,
    modelName: "User",
  }
);
