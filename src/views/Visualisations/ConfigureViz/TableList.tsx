import { FC } from "react";

import { List, Checkbox } from "antd";
import { CheckboxChangeEvent } from "antd";
import { ObjectType } from "@/types";

export interface TableListProps {
  list?: any[];
  onSelect: (e: CheckboxChangeEvent) => void;
}

const TableList: FC<TableListProps> = ({ list, onSelect }) => (
  <List
    className='bg-white h-[300px] overflow-y-auto'
    bordered
    dataSource={list}
    renderItem={(item: ObjectType) => (
      <List.Item>
        <Checkbox onChange={onSelect} value={item.tableName} checked={item.checked}>
          {item.tableName}
        </Checkbox>
      </List.Item>
    )}
  />
);

export default TableList;
