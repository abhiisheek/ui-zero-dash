import React from "react";
import { Layout, Typography, Divider, Flex } from "antd";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <Layout.Sider width={100} className='!bg-white'>
      <Typography.Title className='!text-[20px] flex justify-center min-h-[64px] items-center !mb-0'>
        ZeroDash
      </Typography.Title>
      <Divider className="!m-0" />
      <Flex gap='large' vertical justify='center' className="!mx-[8px]">
        <Link to='/projects'>Projects</Link>
        <Link to='/dashboards'>Dashboards</Link>
      </Flex>
    </Layout.Sider>
  );
};

export default Navbar;
