import { FC, ReactNode, memo } from "react";

import { Divider, Layout } from "antd";

import cssStyles from "./Parent.module.css";

interface ParentProps {
  children: ReactNode;
}

const { Content } = Layout;

const Parent: FC<ParentProps> = ({ children }) => {
  return (
    <Layout hasSider className={cssStyles.wrapper}>
      <div className="w-[80px] bg-[#ffffff]">Nav Bar</div>
      <Layout>
        <div className="h-[64px] bg-[#0958d9]">Zero Dash Header</div>
        <Divider className={cssStyles.divider} />
        <Content className='overflow-auto p-[8px]'>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default memo(Parent);
