import { FC, useEffect, useState, useCallback } from "react";

import { Row, Col, Typography, Card } from "antd";

import embed from "vega-embed";

import Configurator from "@/components/VisualisationConfigurator";
import VizCatalog from "./VizCatalog";
import {
  generateSelectFieldOptionsFromDataset,
  isConfigurationComplete,
  getChartConfigFromConfiguredValues,
} from "./helpers";

import { basic } from "./mockChartData";
import { ObjectType } from "@/types";

const mockData = {
  values: basic,
};

const ConfigureViz: FC<ObjectType> = ({ data = mockData }) => {
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

  return (
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
          <VizCatalog selectedViz={selectedViz} onSelectedVizChange={handleOnSelectedVizChange} />
        </Card>
      </Col>
    </Row>
  );
};

export default ConfigureViz;
