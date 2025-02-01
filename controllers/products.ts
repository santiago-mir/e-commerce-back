import { Product } from "models/models";

type getProductsResponse = {
  products: Object[];
  numberOfProducts: number;
  limit: number;
  page: number;
  numberOfPages: number;
  query: string;
};

type productData = {
  materials: string[];
  size: string;
  unit_cost: number;
  settings: string[];
  vendor: string[];
  color: string[];
  designer: string[];
  link: string;
  name: string;
  type: string;
  images: Object[];
  description: string;
  total_sold: number;
  gross_sales: number;
  id: string;
};

export async function getProducts(
  query: string,
  limit: number,
  offset: number
) {
  const algoliaOffset = Math.floor(offset / limit);
  const inStockHits = await Product.getProducts(
    query,
    limit,
    algoliaOffset,
    true
  );
  const formatResponse: getProductsResponse = {
    products: inStockHits.hits,
    numberOfProducts: inStockHits.nbHits,
    limit,
    page: inStockHits.page,
    numberOfPages: inStockHits.nbPages,
    query,
  };
  return formatResponse;
}
export async function getSingleProduct(
  productId: string
): Promise<productData> {
  const singleProduct = await Product.getSingleProduct(productId);
  const formatResponse: productData = {
    materials: singleProduct.Materials as string[],
    size: singleProduct["Size (WxLxH)"] as string,
    unit_cost: singleProduct["Unit cost"] as number,
    settings: singleProduct.Settings as string[],
    vendor: singleProduct.Vendor as string[],
    color: singleProduct.Color as string[],
    designer: singleProduct.Designer as string[],
    link: singleProduct.Link as string,
    name: singleProduct.Name as string,
    type: singleProduct.Type as string,
    images: singleProduct.Images as Object[],
    description: singleProduct.Description as string,
    total_sold: singleProduct["Total units sold"] as number,
    gross_sales: singleProduct["Gross sales"] as number,
    id: singleProduct.ObjectID as string,
  };
  return formatResponse;
}
