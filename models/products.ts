// using algolia

import { SearchResponse } from "algoliasearch";
import { client } from "db/algolia";

export class Product {
  static index: string = "products";

  static async getProducts(
    query: string,
    limit: number,
    offset: number
  ): Promise<SearchResponse<unknown>> {
    const response = await client.searchSingleIndex({
      indexName: this.index,
      searchParams: {
        query,
        hitsPerPage: limit,
        page: offset,
        filters: "Stock:true",
      },
    });
    return response;
  }
}
