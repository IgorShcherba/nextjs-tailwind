import { useState, useEffect } from "react";

import Layout from "components/Layout";
import { fetcher } from "utils/fetcher";
import { useSession } from "next-auth/client";

const AccountPage = () => {
  const [session, loading] = useSession();
  const [data, setData] = useState<{ content?: string }>({});

  useEffect(() => {
    const getUserSecretData = async () => {
      const json = await fetcher("/api/secret");

      if (json.content) {
        setData(json);
      }
    };

    getUserSecretData();
  }, [session]);

  console.log("session", session, loading, data);

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-center my-8 font-bold">UserAccount page</h1>
        {loading ? (
          <span>loading ...</span>
        ) : (
          <p className="my-4">{data?.content}</p>
        )}
      </div>{" "}
    </Layout>
  );
};

export default AccountPage;
