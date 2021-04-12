import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "lib/prisma";

/**
 *
 * Returns last 5 published messages
 *
 * @param req NextApiRequest
 * @param res NextApiRequest
 */

export default async function handle(_: NextApiRequest, res: NextApiResponse) {
  const posts = await prisma.message.findMany({
    where: { published: true },
    include: { author: true },
    take: -5,
  });
  res.json(posts);
}
