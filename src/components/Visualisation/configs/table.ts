import constants from "@/constants/constants";

import { VEGA_SCHEMA, CATEGORY_FIELD, VALUE_AGGREGATION_FIELD, VALUE_FIELD } from "../helpers";

const {
  VIZ_CONFIG: {
    CHART_TYPES: { TABLE },
  },
} = constants;

export default {
  defaultProps: {},
  meta: [{ ...CATEGORY_FIELD }, { ...VALUE_FIELD }, { ...VALUE_AGGREGATION_FIELD }],
};
