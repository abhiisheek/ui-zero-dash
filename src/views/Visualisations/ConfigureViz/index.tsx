import { FC, useEffect, useState, useCallback } from "react";

import { Row, Col, Typography, Card, Collapse, Input, Button, Table } from "antd";
import { FormItemLayout } from "antd/es/form/Form";
import type { CheckboxChangeEvent, CollapseProps } from "antd";

import embed from "vega-embed";
import Editor from "@monaco-editor/react";

import Configurator from "@/components/VisualisationConfigurator";
import FormItem from "@/components/FormItem";
import { ObjectType } from "@/types";
import constants from "@/constants/constants";
import { useTables, useTablesMetadata, useExecuteQuery } from "@/query/db";
import Loader from "@/components/Loader";
import VizCatalog from "./VizCatalog";
import {
  generateSelectFieldOptionsFromDataset,
  isConfigurationComplete,
  getChartConfigFromConfiguredValues,
} from "./helpers";

import { basic } from "./mockChartData";
import TableList from "./TableList";

const schema = "sys";

const mockData = {
  values: basic,
};

const {
  ANT: {
    LAYOUT: { VERTICAL },
  },
} = constants;

const ConfigureViz: FC<ObjectType> = ({ data = mockData }) => {
  const [name, setName] = useState("");
  const [userInput, setUserInput] = useState("");
  const [query, setQuery] = useState("");
  const [queryResults, setQueryResults] = useState<any>(null);
  const [tables, setTables] = useState<any[]>([]);
  const { mutate: getTables, isPending: isGetTablesPending } = useTables();
  const { mutate: getTablesMetadata, isPending: isGetTablesMetadataPending } = useTablesMetadata();
  const { mutate: executeQuerry, isPending: isExecuteQueryPending } = useExecuteQuery();
  const [vizPropsData, setVizPropsData] = useState<ObjectType>({});
  const [selectFieldOptionsMap, setSelectFieldOptionsMap] = useState<ObjectType>({});
  const [selectedViz, setSelectedViz] = useState<ObjectType>({});

  const handleOnSetValue = useCallback(
    (key: string, value: any) => setVizPropsData((old) => ({ ...old, [key]: value })),
    [],
  );

  const handleOnSelectedVizChange = useCallback((viz: ObjectType) => {
    setSelectedViz(viz);
    setVizPropsData({});
  }, []);

  useEffect(() => {
    getTables(schema, { onSuccess: (data) => setTables(data) });
  }, []);

  useEffect(() => {
    if (selectedViz?.config && data.values.length) {
      setSelectFieldOptionsMap(
        generateSelectFieldOptionsFromDataset(data.values[0], selectedViz.config?.meta),
      );
    }
  }, [selectedViz, data]);

  useEffect(() => {
    if (selectedViz?.config && isConfigurationComplete(vizPropsData, selectedViz.config?.meta)) {
      let vizProps = selectedViz.config?.defaultProps;

      vizProps.data = data;

      const getConfig = selectedViz.config?.configGenerator || getChartConfigFromConfiguredValues;

      embed("#viz", getConfig(vizProps, vizPropsData, selectedViz.config?.metaF));
    }
  }, [data, selectedViz, vizPropsData]);

  const handleOnExecuteQuery = useCallback(() => {
    if (query) {
      executeQuerry(query, {
        onSuccess: (data) => {
          const [headers, ...rows] = data;
          const columns = headers.map((header: string) => ({
            title: header,
            dataIndex: header,
            key: header,
          }));
          const dataSource: any[] = [];

          rows.forEach((row: any) => {
            const dataItem: any = {};

            headers.forEach((header: string, index: number) => (dataItem[header] = row[index]));

            dataSource.push(dataItem);
          });

          setQueryResults({ columns, dataSource });
        },
      });
    }
  }, [query]);

  const handleOnTableSelectChange = useCallback(
    (e: CheckboxChangeEvent) =>
      setTables((old) =>
        old.map((item: any) => {
          if (item.tableName === e.target.value) {
            return { ...item, checked: e.target.checked };
          } else {
            return item;
          }
        }),
      ),
    [],
  );

  useEffect(() => {
    const selectedTables = tables.filter((item) => item.checked).map((item) => item.tableName);

    if (selectedTables.length) {
      getTablesMetadata(
        { schema, tables: selectedTables },
        { onSuccess: (data) => console.log(data) },
      );
    }
  }, [tables]);

  const items: CollapseProps["items"] = [
    {
      key: "datasource",
      label: "Data Source Configuration",
      children: (
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <FormItem layout={VERTICAL as FormItemLayout} label='Select Tables'>
              <TableList list={tables} onSelect={handleOnTableSelectChange} />
            </FormItem>
          </Col>
          <Col span={16}>
            <Row gutter={8}>
              <Col span={24}>
                <FormItem layout={VERTICAL as FormItemLayout} label='User Input Prompt'>
                  <Input value={userInput} onChange={(e) => setUserInput(e.target.value)} />
                </FormItem>
              </Col>
              <Col span={24} className='!flex justify-end'>
                <Button type='primary'>Generate</Button>
              </Col>
              <Col span={24}>
                <FormItem layout={VERTICAL as FormItemLayout} label='SQL Query'>
                  <Editor
                    className='h-[150px] border border-solid border-gray-200 p-[8px]'
                    language='sql'
                    value={query}
                    onChange={(value) => setQuery(value || "")}
                    options={{
                      minimap: { enabled: false },
                      readOnly: false,
                      wordWrap: "on",
                      lineNumbers: "off",
                      folding: false,
                      lineDecorationsWidth: 0,
                      lineNumbersMinChars: 0,
                      fontSize: 14,
                    }}
                  />
                </FormItem>
              </Col>
              <Col span={24} className='!flex justify-end'>
                <Button type='primary' onClick={handleOnExecuteQuery}>
                  Execute
                </Button>
              </Col>
            </Row>
          </Col>
          {queryResults && (
            <Col span={24}>
              <FormItem layout={VERTICAL as FormItemLayout} label='Sample Result'>
                <Table
                  dataSource={queryResults?.dataSource}
                  columns={queryResults?.columns}
                  pagination={false}
                />
              </FormItem>
            </Col>
          )}
        </Row>
      ),
    },
    {
      key: "visual",
      label: "Visual Configuration",
      children: (
        <Row gutter={[16, 16]} className='p=[16px] h-full'>
          <Col span={6}>
            <Card className='overscroll-y-auto min-h-full'>
              <Configurator
                setValue={handleOnSetValue}
                data={vizPropsData}
                options={selectFieldOptionsMap}
                props={selectedViz?.config?.meta}
              />
            </Card>
          </Col>
          <Col span={12}>
            <Card className='min-h-full'>
              <Typography.Text>Preview</Typography.Text>
              <div id='#viz' className='py-[24px] w-full h-full' />
            </Card>
          </Col>
          <Col span={6}>
            <Card className='overscroll-y-auto min-h-full'>
              <VizCatalog
                selectedViz={selectedViz}
                onSelectedVizChange={handleOnSelectedVizChange}
              />
            </Card>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <Card className='w-full'>
      {(isGetTablesMetadataPending || isGetTablesPending || isExecuteQueryPending) && (
        <Loader fullScreen />
      )}
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <FormItem layout={VERTICAL as FormItemLayout} label='Visualisation Name' required>
            <Input value={name} onChange={(evt) => setName(evt.target.value)} />
          </FormItem>
        </Col>
        <Col span={24}>
          <Collapse items={items} defaultActiveKey={["datasource"]} />
        </Col>
      </Row>
    </Card>
  );
};

export default ConfigureViz;
