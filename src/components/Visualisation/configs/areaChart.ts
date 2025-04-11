import constants from "@/constants/constants";

import { VEGA_SCHEMA, CATEGORY_FIELD, VALUE_AGGREGATION_FIELD, VALUE_FIELD } from "../helpers";

const {
  VIZ_CONFIG: {
    CHART_TYPES: { AREA },
  },
} = constants;

export default {
  defaultProps: {
    $schema: VEGA_SCHEMA,
    mark: {
      type: AREA,
      tooltip: true,
    },
    width: "container",
    autosize: { type: "fit" },
    padding: 5,
  },
  meta: [{ ...CATEGORY_FIELD }, { ...VALUE_FIELD }, { ...VALUE_AGGREGATION_FIELD }],
};
