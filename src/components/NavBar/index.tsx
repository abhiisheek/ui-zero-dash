import React from "react";
import { Layout, Typography, Divider, Flex, Row, Col } from "antd";
import { Link } from "react-router-dom";

import appIcon from "@/images/app-icon.jpg";

const Navbar: React.FC = () => {
  return (
    <Layout.Sider width={100} className='!bg-white'>
      <Row gutter={4} align='middle' justify='center'>
        <Col>
          <img src={appIcon} alt='Logo' className="w-[48px] h-[48px] mt-[4px]" />
        </Col>
        <Col>
          <Typography.Text strong>
            ZeroDash
          </Typography.Text>
        </Col>
      </Row>
      <Divider className='!my-[8px] !border-[#001529]' />
      <Flex gap='large' vertical justify='center' className='!mx-[8px]'>
        <Link to='/projects'>Projects</Link>
        <Link to='/dashboards'>Dashboards</Link>
      </Flex>
    </Layout.Sider>
  );
};

export default Navbar;
