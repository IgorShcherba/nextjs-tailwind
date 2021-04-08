import { NextApiRequest, NextApiResponse } from "next";

import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID!,
      clientSecret: process.env.FACEBOOK_SECRET!,
    }),
  ],
  database: {
    type: "postgres",
    host: process.env.DATABASE_HOST ?? "127.0.0.1",
    port: process.env.DATABASE_PORT ?? "5432",
    username: process.env.DATABASE_USER ?? "igor",
    password: process.env.DATABASE_PASSWORD ?? "qwerty",
    database: process.env.DATABASE_NAME ?? "test-db",
  },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
