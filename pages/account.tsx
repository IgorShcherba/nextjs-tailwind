import { useState, useEffect } from "react";

import Layout from "components/Layout";
import { fetcher } from "utils/fetcher";
import withAuthentication from "hocs/withAuthentication";
import { Container } from "components/Container";

const AccountPage = () => {
  const [data, setData] = useState<{ content?: string }>({});

  useEffect(() => {
    const getUserSecretData = async () => {
      try {
        const json = await fetcher("/secret");

        if (json.content) {
          setData(json);
        }
      } catch (err) {
        // TODO: setError
        console.log("err", err);
      }
    };

    getUserSecretData();
  }, []);

  return (
    <Layout>
      <Container>
        <h1 className="text-center my-8 font-bold">UserAccount page</h1>

        <p className="my-4">{data?.content}</p>
      </Container>
    </Layout>
  );
};

export default withAuthentication(AccountPage);
