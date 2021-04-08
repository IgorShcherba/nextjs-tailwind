import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (session) {
    res.send({
      content: "Private user data here",
    });
  } else {
    res.send({ content: "You are not signed in!" });
  }
};
