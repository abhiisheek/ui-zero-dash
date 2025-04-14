import React, { FC, useMemo } from "react";

import { Table } from "antd";

import { ObjectType } from "@/types";

const TableComponent: FC<ObjectType> = ({ data, propsData, ...rest }) => {
  const isPaginationNeeded = useMemo(() => {
    if (Array.isArray(data) && data.length >= 10) {
      return;
    } else {
      return false;
    }
  }, [data]);

  const columns = useMemo(() => {
    const selectedColumns: any = [];
    const colKeys = Object.keys(propsData);

    if (colKeys.length) {
      colKeys.forEach((colKey: string) => {
        const colData = propsData[colKey];

        if (colData.checked) {
          selectedColumns.push({
            key: colKey,
            dataIndex: colKey,
            title: colData.name,
          });
        }
      });
    }

    return selectedColumns;
  }, [propsData]);

  return <Table dataSource={data || []} columns={columns} pagination={isPaginationNeeded} {...rest} />;
};

export default React.memo(TableComponent);
