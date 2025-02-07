// using algolia

import { SearchParams, SearchResponse } from "algoliasearch";
import { client } from "db/algolia";

export class Product {
  static index: string = "products";

  static async getProducts(
    query: string,
    limit: number,
    offset: number,
    filterStock?: boolean
  ): Promise<SearchResponse<unknown>> {
    const searchParams: SearchParams = {
      query,
      hitsPerPage: limit,
      page: offset,
    };
    if (filterStock) {
      searchParams.filters = "Stock:true";
    }
    const response = await client.searchSingleIndex({
      indexName: this.index,
      searchParams,
    });
    return response;
  }

  static async getSingleProduct(
    productId: string
  ): Promise<Record<string, unknown>> {
    try {
      const response = await client.getObject({
        indexName: this.index,
        objectID: productId,
      });
      return response;
    } catch (err) {
      throw err;
    }
  }
}
