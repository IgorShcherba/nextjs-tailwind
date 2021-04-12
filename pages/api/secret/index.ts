import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/client";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(404).send({
      content: "Only 'Get' is allowed",
    });
  }

  //  Example of secure api route
  const session = await getSession({ req });
  if (session) {
    res.send({
      content: "Private user data here",
    });
  } else {
    res.status(401).send({ content: "You are not signed in!" });
  }
};
