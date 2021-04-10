import { Container } from "components/Container";
import { Form } from "components/Form";
import Layout from "components/Layout";

const IndexPage = () => (
  <Layout>
    <Container>
      <h1 className="text-center my-8 font-bold">Next js with Tailwind css </h1>
      <Form />
    </Container>
  </Layout>
);

export default IndexPage;
