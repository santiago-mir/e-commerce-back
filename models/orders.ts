import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import { sequelize } from "db/sequelize";
import { User } from "./user";

export class Order extends Model<
  InferAttributes<Order>,
  InferCreationAttributes<Order>
> {
  declare id: string;
  declare name: string;
  declare productId: string;
  declare amount: number;
  declare status: string;
  declare UserId: number;

  static async createNewOrder(
    productName: string,
    productId: string,
    productValue: number,
    orderId: string,
    userId: number
  ): Promise<Order> {
    const createOrder = await Order.create({
      id: orderId,
      name: productName,
      productId,
      amount: productValue,
      status: "pending",
      UserId: userId,
    });
    return createOrder;
  }
  static async confirmOrder(orderId: string) {
    const confirmedOrder = await Order.update(
      {
        status: "approved",
      },
      {
        where: { id: orderId },
      }
    );
    return confirmedOrder;
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
    name: { type: DataTypes.STRING, allowNull: false },
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
