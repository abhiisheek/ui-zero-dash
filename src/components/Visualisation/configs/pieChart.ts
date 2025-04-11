import constants from "@/constants/constants";

import { VEGA_SCHEMA, CATEGORY_FIELD, VALUE_FIELD } from "../helpers";
import { ObjectType } from "@/types";

const {
  VIZ_CONFIG: {
    CHART_TYPES: { PIE },
    FIELD_TYPES: { BOOLEAN, NUMBER },
    VALUE_TYPES: { NOMINAL, QUANTITATIVE },
  },
} = constants;

export default {
  defaultProps: {
    $schema: VEGA_SCHEMA,
    mark: {
      type: PIE,
      tooltip: true,
    },
    width: "container",
    autosize: { type: "fit" },
    padding: 5,
  },
  meta: [
    { ...CATEGORY_FIELD, key: "color" },
    { ...VALUE_FIELD, key: "theta", multiple: false },
    {
      label: "Show Values In Percentage",
      type: BOOLEAN,
      key: "valueInPercentage",
      defaultValue: false,
    },
    {
      label: "Donut Inner Radius",
      type: NUMBER,
      key: "innerRadius",
      defaultValue: 0,
    },
  ],
  configGenerator: (config: ObjectType, configData: ObjectType) => {
    const { color, theta, innerRadius } = configData;
    const pieConfig: ObjectType = {
      ...config,
      encoding: {
        color: { field: color, type: NOMINAL },
        theta: { field: theta, type: QUANTITATIVE },
      },
    };

    pieConfig.mark.innerRadius = innerRadius;

    if (configData.valueInPercentage) {
      pieConfig.encoding.theta.stack = "normalize";
    } else {
      pieConfig.encoding.theta.stack = undefined;
    }

    return pieConfig;
  },
};
