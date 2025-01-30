import { Product } from "models/models";

type getProductsResponse = {
  products: Object[];
  numberOfProducts: number;
  limit: number;
  page: number;
  numberOfPages: number;
  query: string;
};

export async function getProducts(
  query: string,
  limit: number,
  offset: number
) {
  const algoliaOffset = Math.floor(offset / limit);
  const inStockHits = await Product.getProducts(query, limit, algoliaOffset);
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
