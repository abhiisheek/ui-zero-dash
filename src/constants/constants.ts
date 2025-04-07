import { AREA, ARC, BAR, LINE } from "vega-lite/build/src/mark";
import { QUANTITATIVE, NOMINAL } from "vega-lite/build/src/type";

export default {
  EVENTS: {
    SHOW_NOTIFIER: "SHOW_NOTIFIER",
  },
  NOTIFIER_TYPES: {
    SUCCESS: "success",
    ERROR: "error",
    INFO: "info",
    WARNING: "warning",
  },
  UI_CONFIG: {
    NO_HEADER_ROUTES: ["/login"],
    NO_NAV_ROUTES: ["/login"],
  },
  ANT: {
    LAYOUT: {
      HORIZONTAL: "horizontal",
      VERTICAL: "vertical",
    },
    SIZE: {
      LARGE: "large",
      MIDDLE: "middle",
      SMALL: "small",
    },
  },
  VIZ_CONFIG: {
    FIELD_TYPES: {
      TEXT: "TEXT",
      NUMBER: "NUMBER",
      SELECT: "SELECT",
      BOOLEAN: "BOOLEAN",
    },
    CHART_TYPES: {
      BAR: BAR,
      PIE: ARC,
      LINE: LINE,
      AREA: AREA,
    },
    VALUE_TYPES: {
      NOMINAL: NOMINAL,
      QUANTITATIVE: QUANTITATIVE,
    },
  },
};
