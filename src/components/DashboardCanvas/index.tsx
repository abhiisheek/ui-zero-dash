import { FC } from "react";

import { Responsive, WidthProvider } from "react-grid-layout";

import "./cssStyles.css";

const RGL = WidthProvider(Responsive);

const DashboardCanvas: FC<any> = ({ children, ...rest }) => {
  return (
    <RGL {...rest} allowOverlap={false} preventCollision={false}>
      {children}
    </RGL>
  );
};

export default DashboardCanvas;
