import React, { ReactNode } from "react";
import { Header } from "./Header";
import { Navbar } from "./Navbar";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => (
  <>
    <Header />
    <Navbar />
    <div>{children}</div>
  </>
);

export default Layout;
