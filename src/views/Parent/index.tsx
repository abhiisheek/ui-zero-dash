import { FC, ReactNode, memo } from "react";

import { Divider, Layout } from "antd";

import Header from "@/components/Header";
import Navbar from "@/components/NavBar";

import cssStyles from "./Parent.module.css";

interface ParentProps {
  children: ReactNode;
}

const { Content } = Layout;

const Parent: FC<ParentProps> = ({ children }) => {
  return (
    <Layout hasSider className={cssStyles.wrapper}>
      <Navbar />
      <Layout>
        <Header />
        <Divider className={cssStyles.divider} />
        <Content className='overflow-auto p-[8px]'>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default memo(Parent);
