import { useState, useEffect } from "react";

import Layout from "components/Layout";
import { fetcher } from "utils/fetcher";
import { GetServerSideProps } from "next";
import { ensureAuth } from "hoc/ensureAuth";

const AccountPage = () => {
  const [data, setData] = useState<{ content?: string }>({});

  useEffect(() => {
    const getUserSecretData = async () => {
      const json = await fetcher("/api/secret");

      if (json.content) {
        setData(json);
      }
    };

    getUserSecretData();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4">
        <h1 className="text-center my-8 font-bold">UserAccount page</h1>

        <p className="my-4">{data?.content}</p>
      </div>
    </Layout>
  );
};

export default AccountPage;

export const getServerSideProps: GetServerSideProps = ensureAuth(async () => {
  return { props: {} };
});
