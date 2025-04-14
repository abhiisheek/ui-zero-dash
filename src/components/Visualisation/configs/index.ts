import { ObjectType } from "@/types";

import bar from "@/images/bar.png";
import line from "@/images/line.png";
import area from "@/images/area.png";
import pie from "@/images/pie.png";
import donut from "@/images/donut.png";
import table from "@/images/table.png";

import barChart from "@/components/Visualisation/configs/barChart";
import lineChart from "@/components/Visualisation/configs/lineChart";
import areaChart from "@/components/Visualisation/configs/areaChart";
import pieChart from "@/components/Visualisation/configs/pieChart";
import tableComp from "@/components/Visualisation/configs/table";

export const VIZ_MAP: ObjectType = {
  area: { icon: area, config: areaChart, label: "Area Chart", type: "area" },
  bar: { icon: bar, config: barChart, label: "Bar Chart", type: "bar" },
  donut: { icon: donut, config: pieChart, label: "Donut Chart", type: "donut" },
  line: { icon: line, config: lineChart, label: "Line Chart", type: "line" },
  pie: { icon: pie, config: pieChart, label: "Pie Chart", type: "pie" },
  table: { icon: table, config: tableComp, label: "Table", type: "table" },
};

export const getVizDetailsFromType = (type: string) => VIZ_MAP[type] || VIZ_MAP.bar;