import { FC, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { Row, Col, Input, Card, Button } from "antd";
import { useNavigate, useParams } from "react-router";

import { ObjectType } from "@/types";
import constants from "@/constants/constants";
import Breadcrumb from "@/components/Breadcrumb";
import FormItem from "@/components/FormItem";
import { FormItemLayout } from "antd/es/form/Form";
import { useProject, useVisuals } from "@/query/project";
import { useExecuteQueries } from "@/query/db";
import { AppContext } from "@/context/AppContext";
import Loader from "@/components/Loader";
import { getVizDetailsFromType } from "@/components/Visualisation/configs";
import VisualCard from "@/components/Visualisation/VisualCard";

const {
  ANT: {
    LAYOUT: { VERTICAL },
  },
  VIEW_MODES: { EDIT },
} = constants;

const CreateDashboard: FC<ObjectType> = ({ mode }) => {
  const { projectId, dashboardId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [projectDetails, setProjectDetails] = useState<any>({});
  const { mutate: getProjectDetails, isPending: isGetProjectDetailsPending } = useProject();
  const { setState } = useContext(AppContext);
  const { mutate: getAllViz, isPending: isGetAllVizPending } = useVisuals();
  const [vizList, setVizList] = useState<any>([]);
  const [vizAddedToDashboard, setVizAddedToDashboard] = useState<any>([]);
  const executeQueries = useExecuteQueries(
    vizAddedToDashboard.map((viz: ObjectType) => viz?.datasource?.db?.query),
  );

  console.log("AB::", executeQueries);

  useEffect(() => setState((old: ObjectType) => ({ ...old, viewName: "Create Dashboard" })), []);

  useEffect(() => {
    if (projectId) {
      getProjectDetails(projectId, {
        onSuccess: (data: ObjectType) => setProjectDetails(data),
      });
      getAllViz(projectId, { onSuccess: (data) => setVizList(data) });
    }
  }, [projectId]);

  const modeSpecificConfig = useMemo(
    () =>
      mode === EDIT
        ? {
            breadcrumb: [{ title: "Edit", path: `/Edit` }],
            disableName: true,
            saveBtnLabel: "Update",
            onSave: () => {},
          }
        : {
            breadcrumb: [{ title: "Create", path: `/create` }],
            disableName: false,
            saveBtnLabel: "Create",
            onSave: () => {},
          },
    [mode],
  );

  const handleOnDrag = useCallback((evt: any, viz: ObjectType) => {
    evt.dataTransfer.setData("newViz", JSON.stringify(viz));
  }, []);

  const handleOnDrop = useCallback((evt: any) => {
    evt.preventDefault();

    const newViz = JSON.parse(evt.dataTransfer.getData("newViz"));

    setVizAddedToDashboard((old: []) => [...old, newViz]);
  }, []);

  return (
    <>
      {(isGetProjectDetailsPending || isGetAllVizPending) && <Loader fullScreen />}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Breadcrumb
            items={[
              { title: "Home", path: "" },
              { title: "Projects", path: "/projects" },
              { title: projectDetails?.name || "Project Name", path: `/${projectId}` },
              { title: "Dashboards", path: `/dashboards` },
              ...modeSpecificConfig.breadcrumb,
            ]}
          />
        </Col>
        <Col span={24}>
          <Row justify='space-between' align='middle'>
            <Col span={8}>
              <FormItem layout={VERTICAL as FormItemLayout} label='Dashboard Title' required>
                <Input
                  value={name}
                  onChange={(evt) => setName(evt.target.value)}
                  disabled={modeSpecificConfig.disableName}
                />
              </FormItem>
            </Col>
            <Col>
              <Button type='primary' onClick={modeSpecificConfig.onSave} disabled={!name}>
                {modeSpecificConfig.saveBtnLabel}
              </Button>
            </Col>
          </Row>
        </Col>
        <Col span={24} className='overflow-y-auto'>
          <Card>
            <Row gutter={16}>
              {vizList.map((viz: ObjectType) => {
                const item = getVizDetailsFromType(viz?.config?.type);

                return (
                  <Col key={viz.id}>
                    <Card
                      className='!border-[2px] border-solid border-[#001529] hover:shadow-md w-[120px] h-[140px]'
                      draggable
                      onDragStart={(evt) => handleOnDrag(evt, viz)}
                    >
                      <Row gutter={[4, 4]}>
                        <Col span={24}>
                          <img src={item.icon} alt={item.label} className='w-[full] h-[40px]' />
                        </Col>
                        <Col span={24} className='text-center text-ellipsis overflow-hidden'>
                          {viz.name.slice(0, 20)}...
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Card>
        </Col>
        <Col span={24}>
          <Card
            className='min-h-[400px]'
            onDragOver={(evt) => evt.preventDefault()}
            onDrop={handleOnDrop}
          >
            <Row gutter={16}>
              {vizAddedToDashboard.map((viz: ObjectType, index: number) => {
                return (
                  <VisualCard
                    key={viz._id}
                    id={viz._id}
                    config={viz.config}
                    loading={executeQueries[index]?.isPending}
                    data={executeQueries[index]?.data}
                  />
                );
              })}
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CreateDashboard;
