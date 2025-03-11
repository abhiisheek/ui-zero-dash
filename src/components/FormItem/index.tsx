import { FC } from "react";

import { Form, Typography, FormItemProps } from "antd";

const FormItem: FC<FormItemProps> = ({ label, children, layout, style, ...rest }) => (
  <Form.Item
    label={
      <Typography.Text strong className='ml-[2px] pb-[4px]'>
        {label}
      </Typography.Text>
    }
    layout={layout}
    {...rest}
    style={{ ...style }}
  >
    {children}
  </Form.Item>
);

export default FormItem;
