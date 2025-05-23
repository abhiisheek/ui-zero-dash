import { AREA, ARC, BAR, LINE } from "vega-lite/build/src/mark";
import { QUANTITATIVE, NOMINAL } from "vega-lite/build/src/type";

export default {
  EVENTS: {
    SHOW_NOTIFIER: "SHOW_NOTIFIER",
    VIZ_RESIZE: "VIZ_RESIZE",
  },
  VIEW_MODES: {
    CREATE: "create",
    EDIT: "edit",
  },
  PERSONAS: {
    ADMIN: "admin",
    USER: "user",
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
      TABLE_COLUMN: "TABLE_COLUMN",
    },
    CHART_TYPES: {
      BAR: BAR,
      PIE: ARC,
      LINE: LINE,
      AREA: AREA,
      TABLE: "table",
    },
    VALUE_TYPES: {
      NOMINAL: NOMINAL,
      QUANTITATIVE: QUANTITATIVE,
    },
  },
  GRID_LAYOUT: {
    DEFAULT_LAYOUT_PROPS: {
      w: 6,
      h: 5,
      minW: 1,
      minH: 1,
    },
  },
};
