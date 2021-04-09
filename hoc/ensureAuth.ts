import { getSession } from "next-auth/client";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export const ensureAuth = (gssp: GetServerSideProps) => {
  return async (ctx: GetServerSidePropsContext) => {
    const isAuthenticated = !!(await getSession({ req: ctx.req }));

    if (!isAuthenticated) {
      return { redirect: { permanent: false, destination: "/" }, props: {} };
    }
    return gssp(ctx);
  };
};
