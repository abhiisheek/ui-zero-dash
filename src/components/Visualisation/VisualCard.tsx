import { FC, useEffect, memo, useCallback, useMemo } from "react";

import { Typography, Divider } from "antd";
import embed from "vega-embed";

import { ObjectType } from "@/types";
import Loader from "../Loader";
import { getChartConfigFromConfiguredValues, isConfigurationComplete } from "./helpers";
import { getVizDetailsFromType } from "./configs";
import { convertToVegaLiteData } from "@/utils/vega";
import { convertQueryCSVResultsToJSON } from "@/utils/db";
import { on } from "@/utils/emitter";
import constants from "@/constants/constants";
import Table from "./Table";

const VisualCard: FC<ObjectType> = ({ name, loading, config, id, data }) => {
  const jsonData = useMemo(() => convertQueryCSVResultsToJSON(data), [data]);

  const renderViz = useCallback(() => {
    if (config && jsonData) {
      const vizDetails = getVizDetailsFromType(config.type);
      if (
        config.type !== constants.VIZ_CONFIG.CHART_TYPES.TABLE &&
        isConfigurationComplete(config.propsData, vizDetails.config?.meta)
      ) {
        let vizProps = vizDetails.config?.defaultProps;

        vizProps.data = convertToVegaLiteData(jsonData);

        const getConfig = vizDetails.config?.configGenerator || getChartConfigFromConfiguredValues;
        const chartConfig = getConfig(vizProps, config.propsData, vizDetails.config?.meta);

        chartConfig.height = (document.getElementById(id)?.clientHeight || 250) - 36;

        embed(document.getElementById(id) as HTMLDivElement, chartConfig);
      }
    }
  }, [id, jsonData, config]);

  useEffect(() => {
    renderViz();
  }, [renderViz]);

  on(constants.EVENTS.VIZ_RESIZE, () => renderViz());

  return (
    <div title={name} className='relative w-full h-full'>
      <Typography.Text strong className='block pb-[8px]'>
        {name}
      </Typography.Text>
      <Divider className='!mt-[0px] !mb-[0px]' />
      {loading && <Loader />}
      {config.type === constants.VIZ_CONFIG.CHART_TYPES.TABLE ? (
        <Table propsData={config.propsData} data={jsonData} className="w-full h-full overflow-scroll" />
      ) : (
        <div id={id} className='w-full h-full pt-[8px]'></div>
      )}
    </div>
  );
};

export default memo(VisualCard);
