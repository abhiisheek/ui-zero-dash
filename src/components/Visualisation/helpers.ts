import constants from "@/constants/constants";
import { ObjectType } from "@/types";

const {
  VIZ_CONFIG: {
    FIELD_TYPES: { SELECT },
    VALUE_TYPES: { QUANTITATIVE, NOMINAL },
  },
} = constants;

export const VEGA_SCHEMA = "https://vega.github.io/schema/vega-lite/v5.json";

export const CATEGORY_FIELD = {
  label: "Category Field",
  type: SELECT,
  key: "x",
  required: true,
  valueType: NOMINAL,
};

export const VALUE_FIELD = {
  label: "Value Field",
  type: SELECT,
  key: "y",
  required: true,
  valueType: QUANTITATIVE,
  multiple: true,
};

export const AGGREGATION_OPTIONS = [
  { value: "average", label: "Average" },
  { value: "count", label: "Count" },
  { value: "mean", label: "Mean" },
  { value: "median", label: "Median" },
  { value: "sum", label: "Sum" },
];

export const VALUE_AGGREGATION_FIELD = {
  label: "Aggregation On Value Field",
  type: SELECT,
  key: "aggregate",
  aggregationOnField: "y",
  valueType: QUANTITATIVE,
  options: AGGREGATION_OPTIONS,
};

export const generateSelectFieldOptionsFromDataset = (dataItem: ObjectType, props: any[]) => {
  const options: ObjectType = {};
  const nominalFields: any[] = [];
  const quantitativeFields: any[] = [];

  Object.keys(dataItem).forEach((key: string) => {
    if (typeof dataItem[key] === "string") {
      nominalFields.push({ value: key, label: key });
    } else {
      quantitativeFields.push({ value: key, label: key });
    }
  });

  props.forEach((item: any) => {
    const { key, type, options: fOptions, valueType }: ObjectType = item;

    if (type === SELECT) {
      if (fOptions) {
        options[key] = fOptions;
      } else {
        if (valueType === NOMINAL) {
          options[key] = nominalFields;
        } else {
          options[key] = quantitativeFields;
        }
      }
    }
  });

  return options;
};

export const getChartConfigFromConfiguredValues = (
  config: ObjectType,
  data: ObjectType,
  props: any[],
) => {
  const encoding: ObjectType = {};
  const repeat: ObjectType = { layer: [] };

  props.forEach((item: ObjectType) => {
    const { key, valueType, multiple } = item;

    if (data[key]) {
      if (multiple) {
        const offsetKey = key === "x" ? "yOffset" : "xOffset";

        repeat.layer = data[key];
        encoding[key] = {
          field: { repeat: "layer" },
          type: valueType,
        };

        encoding.color = encoding[offsetKey] = { datum: encoding[key].field };
      } else {
        if (key === "aggregate") {
          encoding[item.aggregationOnField].aggregate = data[key];
        }
        encoding[key] = { field: data[key], type: valueType };
      }
    }
  });

  return repeat.layer.length
    ? { ...config, repeat, spec: { mark: config.mark, encoding } }
    : { ...config, encoding };
};

export const isConfigurationComplete = (data: ObjectType, props: any[]) => {
  if (!props.length || !Object.values(data).length) {
    return false;
  }

  let isComplete = true;

  props.forEach((item: ObjectType) => {
    const { key, required } = item;

    if (required && !data[key]) {
      isComplete = false;
    }
  });

  return isComplete;
};
