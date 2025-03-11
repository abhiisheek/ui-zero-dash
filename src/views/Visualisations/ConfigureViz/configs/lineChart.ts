import constants from "@/constants/constants";

import { VEGA_SCHEMA, CATEGORY_FIELD, VALUE_AGGREGATION_FIELD, VALUE_FIELD } from "../helpers";

const {
  VIZ_CONFIG: {
    CHART_TYPES: { LINE },
  },
} = constants;

export default {
  defaultProps: {
    $schema: VEGA_SCHEMA,
    mark: {
      type: LINE,
      tooltip: true,
    },
    width: "container",
    height: 400,
  },
  meta: [{ ...CATEGORY_FIELD }, { ...VALUE_FIELD }, { ...VALUE_AGGREGATION_FIELD }],
};
