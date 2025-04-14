import { FC } from "react";

import { Row, Col, Card, Typography } from "antd";

import { ObjectType } from "@/types";
import { VIZ_MAP } from "@/components/Visualisation/configs";

const VizCatalog: FC<ObjectType> = ({ selectedViz, onSelectedVizChange }) => (
  <Row gutter={[16, 16]}>
    <Col span={24}>
      <Typography.Text strong>Visualisation Types Catalog</Typography.Text>
    </Col>
    {Object.values(VIZ_MAP).map((item: ObjectType) => (
      <Col span={12} key={item.label}>
        <Card
          onClick={() => onSelectedVizChange(item)}
          className={
            item.label === selectedViz.label
              ? "border-[2px] border-solid border-[#001529] hover:shadow-md"
              : "hover:shadow-md"
          }
        >
          <Row gutter={[4, 4]}>
            <Col span={24}>
              <img src={item.icon} alt={item.label} className='w-full h-[80px]' />
            </Col>
            <Col span={24} className='text-center'>
              {item.label}
            </Col>
          </Row>
        </Card>
      </Col>
    ))}
  </Row>
);

export default VizCatalog;
