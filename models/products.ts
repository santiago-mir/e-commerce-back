// using algolia

import { SearchResponse } from "algoliasearch";
import { client } from "db/algolia";

export class Products {
  static index: string = "products";

  static async getAllProducts(
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
      },
    });
    return response;
  }
}
