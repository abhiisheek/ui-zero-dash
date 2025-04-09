import { FC, useEffect } from "react";

import { Card } from "antd";
import embed from "vega-embed";

import { ObjectType } from "@/types";
import Loader from "../Loader";
import { getChartConfigFromConfiguredValues, isConfigurationComplete } from "./helpers";
import { getVizDetailsFromType } from "./configs";
import { convertToVegaLiteData } from "@/utils/vega";
import { convertQueryCSVResultsToJSON } from "@/utils/db";

const VisualCard: FC<ObjectType> = ({ name, loading, config, id, data }) => {
  useEffect(() => {
    if (config && data) {
      const vizDetails = getVizDetailsFromType(config.type);

      if (isConfigurationComplete(config.propsData, vizDetails.config?.meta)) {
        let vizProps = vizDetails.config?.defaultProps;

        vizProps.data = convertToVegaLiteData(convertQueryCSVResultsToJSON(data));

        const getConfig = vizDetails.config?.configGenerator || getChartConfigFromConfiguredValues;

        embed(
          document.getElementById(id) as HTMLDivElement,
          getConfig(vizProps, config.propsData, vizDetails.config?.meta),
        );
      }
    }
  }, [id, data, config]);

  return (
    <Card title={name}>
      {loading && <Loader />} <div id={id} className='min-h-[300px] min-w-[500px]'></div>
    </Card>
  );
};

export default VisualCard;
