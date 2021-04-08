import React, { ReactNode } from "react";
import { Header } from "./Header";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => (
  <>
    <Header />
    <div>{children}</div>
  </>
);

export default Layout;
