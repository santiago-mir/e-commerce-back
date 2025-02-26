import Airtable from "airtable";

const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
const AIRTABLE_BASE = process.env.AIRTABLE_BASE;
export const airtableBase = new Airtable({ apiKey: AIRTABLE_TOKEN }).base(
  AIRTABLE_BASE
);
