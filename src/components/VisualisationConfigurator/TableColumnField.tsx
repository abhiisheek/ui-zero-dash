import { FC } from "react";

import { Input, Checkbox, Row, Col } from "antd";

interface TableColumnFieldProps {

  label: string;
  selected: boolean;
  value: any;
  defaultValue?: any;
  onChange?: ( value: any) => void;
}

const TableColumnField: FC<TableColumnFieldProps> = ({ value, onChange, defaultValue }) => (
  <Row gutter={8} align='middle'>
    <Col>
      <Checkbox
        checked={value?.checked}
        onChange={(e) => onChange?.({ ...value, checked: e.target.checked })}
      />
    </Col>
    <Col>
      <Input
        value={value?.name}
        defaultValue={defaultValue}
        onChange={(e) => onChange?.({ ...(value || {}), name: e.target.value })}
      />
    </Col>
  </Row>
);

export default TableColumnField;
