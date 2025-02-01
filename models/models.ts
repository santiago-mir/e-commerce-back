import { User } from "./user";
import { Auth } from "./auth";
import { Product } from "./products";
import { Order } from "./orders";

User.hasOne(Auth);
User.hasMany(Order);
Order.belongsTo(User);
Auth.belongsTo(User);

export { User, Auth, Product, Order };
