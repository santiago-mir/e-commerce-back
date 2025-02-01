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
    const createOrder = await Order.create({
      id: orderId,
      productId,
      amount: productValue,
      status: "pending",
      UserId: userId,
    });
    return createOrder;
  }
  static async getAllOrders(userId: number): Promise<Order[]> {
    const allOrders = await Order.findAll({
      where: {
        UserId: userId,
      },
    });
    return allOrders;
  }
  static async getSingleOrder(orderId: string): Promise<Order> {
    const orderFound = await Order.findByPk(orderId);
    return orderFound;
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
    amount: { type: DataTypes.FLOAT, allowNull: false },
    // foreign key
    UserId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    sequelize,
    modelName: "Order",
  }
);
