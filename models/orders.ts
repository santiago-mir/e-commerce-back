import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "db/sequelize";

export class Order extends Model<
  InferAttributes<Order>,
  InferCreationAttributes<Order>
> {
  declare id: string;
  declare productId: string;
  declare amount: number;
  declare status: string;
  declare UserId: number;

  static async createNewOrder(
    productId: string,
    productValue: number,
    orderId: string,
    userId: number
  ): Promise<Order> {
    const createOrder = Order.create({
      id: orderId,
      productId,
      amount: productValue,
      status: "pending",
      UserId: userId,
    });
    return createOrder;
  }
}
Order.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    productId: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.INTEGER, allowNull: false },
    // foreign key
    UserId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "Order",
  }
);
