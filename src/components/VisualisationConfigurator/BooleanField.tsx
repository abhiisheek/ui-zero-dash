import { FC } from "react";

import { Switch, Typography, Row, Col } from "antd";

interface BooleanFieldProps {
  label: string;
  value: boolean;
  defaultValue?: boolean;
  onChange?: (value: boolean) => void;
}

const BooleanField: FC<BooleanFieldProps> = ({ value, label, defaultValue, onChange }) => (
  <Row gutter={8} align='middle'>
    <Col>
      <Switch value={value} defaultValue={defaultValue} onChange={onChange} />
    </Col>
    <Col>
      <Typography.Text>{label}</Typography.Text>
    </Col>
  </Row>
);

export default BooleanField;
