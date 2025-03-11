import { FC, useCallback, ChangeEvent, useMemo } from "react";

import { Input, InputNumber, Select, Row, Col, Typography } from "antd";

import constants from "@/constants/constants";
import { ObjectType } from "@/types";
import FormItem from "../FormItem";
import BooleanField from "./BooleanField";

import { getBooleanProps, getSelectProps, getInputProps } from "./metaToPropMapper";
import { FormItemLayout } from "antd/es/form/Form";

const {
  VIZ_CONFIG: {
    FIELD_TYPES: { TEXT, NUMBER, BOOLEAN, SELECT },
  },
  ANT: {
    LAYOUT: { VERTICAL },
  },
} = constants;

const FIELD_TYPE_MAP = {
  [TEXT]: { Component: Input, propGenerator: getInputProps },
  [NUMBER]: { Component: InputNumber, propGenerator: getInputProps },
  [SELECT]: { Component: Select, propGenerator: getSelectProps },
  [BOOLEAN]: { Component: BooleanField, propGenerator: getBooleanProps },
};

interface ConfiguratorProps {
  setValue: (key: string, value: any) => void;
  props: any[];
  options: ObjectType;
  data: ObjectType;
}

const Configurator: FC<ConfiguratorProps> = ({ setValue, props, options, data }) => {
  const handleOnInputChange = useCallback(
    (key: string, event: ChangeEvent<HTMLInputElement>) => setValue(key, event.target.value),
    [setValue],
  );

  const handleOnChange = useCallback((key: string, value: any) => setValue(key, value), [setValue]);

  const onChangeHandlerMap = useMemo(
    () => ({
      [TEXT]: handleOnInputChange,
      [NUMBER]: handleOnInputChange,
      [SELECT]: handleOnChange,
      [BOOLEAN]: handleOnChange,
    }),
    [],
  );

  const getValue = useCallback(
    (dataObj: ObjectType, item: ObjectType) =>
      dataObj[item.key] ? dataObj[item.key] : item.defaultValue,
    [],
  );

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Text strong>Please Configure</Typography.Text>
      </Col>
      {props?.map((item) => {
        const type = item.type || TEXT;
        const details = FIELD_TYPE_MAP[type];
        const onChange = onChangeHandlerMap[type];
        const compProps = details?.propGenerator(item);
        const { Component }: { Component: FC<any> } = details;

        return (
          <Col span={24}>
            <FormItem
              layout={VERTICAL as FormItemLayout}
              label={item.label}
              required={item.required}
            >
              <Component
                {...compProps}
                onChange={(evt: any) => onChange(item.key, evt)}
                value={getValue(data, item)}
                checked={getValue(data, item)}
                options={options[item.key]}
              />
            </FormItem>
          </Col>
        );
      })}
    </Row>
  );
};

export default Configurator;
