import type { NextApiRequest, NextApiResponse } from "next";
type limitAndOffsetRespone = {
  limit: number;
  offset: number;
};
export function getLimitAndOffset(
  req: NextApiRequest,
  MaxLimit: number,
  MaxOffset: number
): limitAndOffsetRespone {
  const queryLimit = parseInt(req.query.limit as string);
  const queryOffset = parseInt(req.query.offset as string);
  const limit = queryLimit
    ? queryLimit <= MaxLimit
      ? queryLimit
      : MaxLimit
    : 10;
  const offset = queryOffset
    ? queryOffset <= MaxOffset
      ? queryOffset
      : MaxOffset
    : 0;
  return {
    limit,
    offset,
  };
}
