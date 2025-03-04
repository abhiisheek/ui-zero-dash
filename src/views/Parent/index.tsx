import { FC, ReactNode, memo, useEffect } from "react";

import { Divider, Layout } from "antd";
import { useLocation, useNavigate } from "react-router";

import Header from "@/components/Header";
import Navbar from "@/components/NavBar";

import cssStyles from "./Parent.module.css";
import { hideElement } from "@/utils/app";
import constants from "@/constants/constants";

const {
  UI_CONFIG: { NO_HEADER_ROUTES, NO_NAV_ROUTES },
} = constants;

interface ParentProps {
  children: ReactNode;
}

const { Content } = Layout;

const Parent: FC<ParentProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname && location.pathname !== "/login") {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
      }
    }
  }, [location.pathname, navigate]);

  return (
    <Layout hasSider className={cssStyles.wrapper}>
      {!hideElement(location.pathname, NO_NAV_ROUTES) && <Navbar />}
      <Layout>
        {!hideElement(location.pathname, NO_HEADER_ROUTES) && <Header />}
        <Divider className={cssStyles.divider} />
        <Content className='overflow-auto p-[8px]'>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default memo(Parent);
