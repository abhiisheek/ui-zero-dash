import { FC } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb as AntBreadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";

interface BreadcrumbProps {
  items: any[];
}

const Breadcrumb: FC<BreadcrumbProps> = ({ items }) => {
  return (
    <AntBreadcrumb
      separator='>'
      items={items}
      itemRender={(route, _params, routes, paths) => {
        const last = routes.indexOf(route) === routes.length - 1;
        const details =
          route.title === "Home"
            ? { title: <HomeOutlined />, path: "/" }
            : { title: route.title, path: paths.join("/") };

        return last ? <span>{details.title}</span> : <Link to={details.path}>{details.title}</Link>;
      }}
    />
  );
};

export default Breadcrumb;
