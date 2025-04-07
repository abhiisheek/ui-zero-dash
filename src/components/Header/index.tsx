import React, { useContext } from "react";
import { Layout, Menu, Dropdown, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { UserContext } from "@/context/UserContext";
import { AppContext } from "@/context/AppContext";

const { Header: AntHeader } = Layout;

const Header: React.FC = () => {
  const { name } = useContext(UserContext);
  const { state } = useContext(AppContext);

  return (
    <AntHeader className='bg-blue-500 flex items-center !px-[16px]'>
      <div className='container mx-auto flex justify-between items-center'>
        <div className='text-white text-xl'>{state?.viewName}</div>
        <div className='flex items-center'>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key='username'>{name}</Menu.Item>
              </Menu>
            }
            className='ml-4'
          >
            <Avatar icon={<UserOutlined />} />
          </Dropdown>
        </div>
      </div>
    </AntHeader>
  );
};

export default Header;
