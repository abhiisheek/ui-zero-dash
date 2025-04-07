import { FC } from "react";

import { Row, Col, Card, Typography } from "antd";

import { ObjectType } from "@/types";

import bar from "@/images/bar.png";
import line from "@/images/line.png";
import area from "@/images/area.png";
import pie from "@/images/pie.png";
import donut from "@/images/donut.png";

import barChart from "./configs/barChart";
import lineChart from "./configs/lineChart";
import areaChart from "./configs/areaChart";
import pieChart from "./configs/pieChart";

const VIZ_MAP: ObjectType = {
  bar: { icon: bar, config: barChart, label: "Bar Chart", type: "bar" },
  line: { icon: line, config: lineChart, label: "Line Chart", type: "line" },
  area: { icon: area, config: areaChart, label: "Area Chart", type: "area" },
  pie: { icon: pie, config: pieChart, label: "Pie Chart", type: "pie" },
  donut: { icon: donut, config: pieChart, label: "Donut Chart", type: "donut" },
};

export const getVizDetailsFromType = (type: string) => VIZ_MAP[type] || VIZ_MAP.bar;

const VizCatalog: FC<ObjectType> = ({ selectedViz, onSelectedVizChange }) => (
  <Row gutter={[16, 16]}>
    <Col span={24}>
      <Typography.Text strong>Visualisation Types Catalog</Typography.Text>
    </Col>
    {Object.values(VIZ_MAP).map((item: ObjectType) => (
      <Col span={24}>
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
