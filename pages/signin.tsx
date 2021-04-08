import { providers, signIn } from "next-auth/client";
import { DefaultProviders } from "next-auth/providers";
import { GetServerSideProps } from "next";

type PageProps = {
  providers: DefaultProviders;
};

export default ({ providers }: PageProps) => {
  return (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const providersData = await providers();
  return {
    props: { providers: providersData },
  };
};
