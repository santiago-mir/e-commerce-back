import { algoliasearch } from "algoliasearch";
const ALGOLIA_TOKEN = process.env.ALGOLIA_TOKEN;
const ALGOLIA_BASE = process.env.ALGOLIA_BASE;
export const client = algoliasearch(ALGOLIA_BASE, ALGOLIA_TOKEN);
