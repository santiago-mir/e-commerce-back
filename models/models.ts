import { User } from "./user";
import { Auth } from "./auth";
import { Product } from "./products";

User.hasOne(Auth);
Auth.belongsTo(User);

export { User, Auth, Product };
