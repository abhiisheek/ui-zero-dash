import React from 'react';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;

const userMenu = (
  <Menu>
    <Menu.Item key="1">User Name</Menu.Item>
  </Menu>
);

const Header: React.FC = () => {
  return (
    <AntHeader className="bg-blue-500 flex items-center !px-[16px]">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl">Projects</div>
        <div className="flex items-center">
          <Dropdown overlay={userMenu} className="ml-4">
            <Avatar icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </div>
    </AntHeader>
  );
};

export default Header;