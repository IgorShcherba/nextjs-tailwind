import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

/**
 * An Example of the client-side 'securing' logic
 *
 * @param WrappedComponent React Component
 * @returns React Component
 */

const withAuthentication = (WrappedComponent: React.FC) => {
  const RequiresAuthentication = (props: any) => {
    const [session, loading] = useSession();
    const router = useRouter();

    useEffect(() => {
      if (loading) return;
      if (!session) router.push("/");
    }, [session, loading]);

    return session ? <WrappedComponent {...props} /> : null;
  };

  return RequiresAuthentication;
};

export default withAuthentication;
