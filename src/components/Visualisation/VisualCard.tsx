import { FC, useEffect, memo, useCallback, useMemo, useState } from "react";

import { Typography, Divider, Button, Modal, Input } from "antd";
import { EditOutlined } from "@ant-design/icons";
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
import FormItem from "../FormItem";
import { FormItemLayout } from "antd/es/form/Form";

const VisualCard: FC<ObjectType> = ({
  name,
  loading,
  config,
  id,
  data,
  preview = true,
  updateVizName = () => {},
}) => {
  const jsonData = useMemo(() => convertQueryCSVResultsToJSON(data), [data]);
  const [openTitleModal, setOpenTitleModal] = useState(false);
  const [title, setTitle] = useState<string>(name);

  const handleOk = useCallback(() => {
    updateVizName(id, title);
    setOpenTitleModal(false);
  }, [title, id, updateVizName]);

  const handleCancel = useCallback(() => {
    setOpenTitleModal(false);
    setTitle(name);
  }, [name]);

  const handleOnEditTitle = useCallback(() => {
    setOpenTitleModal(true);
  }, []);

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
      <Typography.Text strong className='inline-block pb-[8px]'>
        {name}
      </Typography.Text>
      {!preview && (
        <Button
          icon={<EditOutlined />}
          shape='circle'
          className='!mx-[8px]'
          onClick={handleOnEditTitle}
        />
      )}
      <Divider className='!mt-[0px] !mb-[0px]' />
      {loading && <Loader />}
      {config.type === constants.VIZ_CONFIG.CHART_TYPES.TABLE ? (
        <Table
          propsData={config.propsData}
          data={jsonData}
          className='w-full h-full overflow-scroll'
        />
      ) : (
        <div id={id} className='w-full h-full pt-[8px]'></div>
      )}
      <Modal open={openTitleModal} onOk={handleOk} onCancel={handleCancel} closable={false}>
        <FormItem
          label='Visualisation Title'
          layout={constants.ANT.LAYOUT.VERTICAL as FormItemLayout}
        >
          <Input value={title} onChange={(evt) => setTitle(evt.target.value)} />
        </FormItem>
      </Modal>
    </div>
  );
};

export default memo(VisualCard);
