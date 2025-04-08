import { ObjectType } from "@/types";

import bar from "@/images/bar.png";
import line from "@/images/line.png";
import area from "@/images/area.png";
import pie from "@/images/pie.png";
import donut from "@/images/donut.png";

import barChart from "@/components/Visualisation/configs/barChart";
import lineChart from "@/components/Visualisation/configs/lineChart";
import areaChart from "@/components/Visualisation/configs/areaChart";
import pieChart from "@/components/Visualisation/configs/pieChart";

export const VIZ_MAP: ObjectType = {
  bar: { icon: bar, config: barChart, label: "Bar Chart", type: "bar" },
  line: { icon: line, config: lineChart, label: "Line Chart", type: "line" },
  area: { icon: area, config: areaChart, label: "Area Chart", type: "area" },
  pie: { icon: pie, config: pieChart, label: "Pie Chart", type: "pie" },
  donut: { icon: donut, config: pieChart, label: "Donut Chart", type: "donut" },
};

export const getVizDetailsFromType = (type: string) => VIZ_MAP[type] || VIZ_MAP.bar;