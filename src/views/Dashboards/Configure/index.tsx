import { FC, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { Row, Col, Input, Card, Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import { nanoid } from "nanoid";

import { ObjectType } from "@/types";
import constants from "@/constants/constants";
import Breadcrumb from "@/components/Breadcrumb";
import FormItem from "@/components/FormItem";
import { FormItemLayout } from "antd/es/form/Form";
import {
  useProject,
  useVisuals,
  useCreateDashboard,
  useDashboard,
  useDashboardVisuals,
  useUpdateDashboard,
  usePublishDashboard,
} from "@/query/project";
import { useExecuteQueries } from "@/query/db";
import { AppContext } from "@/context/AppContext";
import Loader from "@/components/Loader";
import { getVizDetailsFromType } from "@/components/Visualisation/configs";
import VisualCard from "@/components/Visualisation/VisualCard";
import DashboardCanvas from "@/components/DashboardCanvas";
import { emit } from "@/utils/emitter";

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
  const [gridLayouts, setGridLayouts] = useState<any>({ lg: [] });
  const [projectDetails, setProjectDetails] = useState<any>({});
  const [disablePublish, setDisablePublish] = useState(true);
  const { mutate: getProjectDetails, isPending: isGetProjectDetailsPending } = useProject();
  const { setState } = useContext(AppContext);
  const { mutate: getAllViz, isPending: isGetAllVizPending } = useVisuals();
  const { mutate: createDashboard, isPending: isCreateDashboardPending } = useCreateDashboard();
  const { mutate: updateDashboard, isPending: isUpdateDashboardPending } = useUpdateDashboard();
  const { mutate: publishDashboard, isPending: isPublishDashboardPending } = usePublishDashboard();
  const { mutate: getDashboard, isPending: isGetDashboardPending } = useDashboard();
  const [vizList, setVizList] = useState<any>([]);
  const [vizAddedToDashboard, setVizAddedToDashboard] = useState<any>([]);
  const [dashboardDetails, setDashboardDetails] = useState<any>(null);

  const useDashboardVisualsCombine = useCallback(
    (results: any) => {
      console.log("dashboardVizDetails", results, dashboardDetails);
      const details = {
        data: results.map((result: any) => result.data),
        pending: results.some((result: any) => result.isPending),
      };

      if (!details.pending && details.data.length) {
        setVizAddedToDashboard(
          details.data.map((viz: any, index: number) => ({
            ...viz[0],
            gridItemId: dashboardDetails?.config?.viz[index]?.gridItemId,
            name: dashboardDetails?.config?.viz[index]?.name || viz[0].name,
          })),
        );
        setGridLayouts(() => dashboardDetails?.config?.layout || { lg: [] });
        setDisablePublish(false);
      }

      return details;
    },
    [dashboardDetails],
  );

  const executeQueries = useExecuteQueries(
    vizAddedToDashboard.map((viz: ObjectType) => viz?.datasource?.db?.query),
  );
  const dashboardVizDetails: any = useDashboardVisuals(
    projectId,
    dashboardDetails?.config?.viz || [],
    useDashboardVisualsCombine,
  );

  useEffect(() => setState((old: ObjectType) => ({ ...old, viewName: "Create Dashboard" })), []);

  useEffect(() => {
    if (projectId) {
      getProjectDetails(projectId, {
        onSuccess: (data: ObjectType) => setProjectDetails(data),
      });
      getAllViz(projectId, { onSuccess: (data) => setVizList(data) });
    }
  }, [projectId]);

  const handleOnCreate = useCallback(() => {
    const payload = {
      projectId,
      name,
      config: {
        layout: gridLayouts,
        viz: vizAddedToDashboard.map((viz: ObjectType) => ({
          vizId: viz._id,
          gridItemId: viz.gridItemId,
          name: viz.name,
        })),
      },
    };

    createDashboard(payload, {
      onSuccess: (data: ObjectType) => {
        emit(constants.EVENTS.SHOW_NOTIFIER, {
          message: "Dashboard created successfully",
          type: constants.NOTIFIER_TYPES.SUCCESS,
          id: Date.now(),
        });
        setGridLayouts({ lg: [] });
        setVizAddedToDashboard([]);
        if (data) {
          navigate(`/projects/${projectId}/dashboards/${data._id}`);
        }
      },
    });
  }, [name, gridLayouts, vizAddedToDashboard, projectId]);

  const handleOnUpdate = useCallback(() => {
    const payload = {
      projectId,
      dashboardId,
      config: {
        layout: gridLayouts,
        viz: vizAddedToDashboard.map((viz: ObjectType) => ({
          vizId: viz._id,
          gridItemId: viz.gridItemId,
          name: viz.name,
        })),
      },
    };

    updateDashboard(payload, {
      onSuccess: () => {
        emit(constants.EVENTS.SHOW_NOTIFIER, {
          message: "Dashboard updated successfully",
          type: constants.NOTIFIER_TYPES.SUCCESS,
          id: Date.now(),
        });
      },
    });
  }, [name, gridLayouts, vizAddedToDashboard, projectId]);

  const handleOnPublish = useCallback(() => {
    setDisablePublish(true);
    const payload = {
      projectId,
      dashboardId,
    };

    publishDashboard(payload, {
      onSuccess: () => {
        emit(constants.EVENTS.SHOW_NOTIFIER, {
          message: "Dashboard published successfully",
          type: constants.NOTIFIER_TYPES.SUCCESS,
          id: Date.now(),
        });
      },

      onError: () => setDisablePublish(false),
    });
  }, [projectId, dashboardId]);

  useEffect(() => {
    if (mode === EDIT && projectId && dashboardId) {
      getDashboard(
        { projectId, dashboardId },
        {
          onSuccess: (data: ObjectType) => {
            if (Array.isArray(data) && data.length) {
              const details = data[0];
              setDashboardDetails(details);
              setName(details.name);
            }
          },
        },
      );
    }
  }, [projectId, dashboardId, mode]);

  const modeSpecificConfig = useMemo(
    () =>
      mode === EDIT
        ? {
            breadcrumb: [{ title: "Edit", path: `/Edit` }],
            disableName: true,
            saveBtnLabel: "Update",
            onSave: handleOnUpdate,
          }
        : {
            breadcrumb: [{ title: "Create", path: `/create` }],
            disableName: false,
            saveBtnLabel: "Create",
            onSave: handleOnCreate,
          },
    [mode, handleOnCreate, handleOnUpdate],
  );

  const handleOnDrag = useCallback((evt: any, viz: ObjectType) => {
    evt.dataTransfer.setData("newViz", JSON.stringify(viz));
  }, []);

  const handleOnDrop = useCallback((layout: any, droppingItem: any, evt: any) => {
    evt.preventDefault();

    const newViz = JSON.parse(evt.dataTransfer.getData("newViz"));
    const gridItemId = nanoid(8);

    setVizAddedToDashboard((old: []) => [...old, { ...newViz, gridItemId }]);
    setGridLayouts((old: any) => ({
      ...old,
      lg: layout.map((item: any) => {
        if (item.i === droppingItem.i) {
          return {
            ...droppingItem,
            ...constants.GRID_LAYOUT.DEFAULT_LAYOUT_PROPS,
            i: gridItemId,
          };
        } else {
          return { ...item };
        }
      }),
    }));
  }, []);

  const handleOnLayoutChange = useCallback((currentLayout: any) => {
    setGridLayouts((old: any) => ({ ...old, lg: currentLayout }));
  }, []);

  const handleOnResizeStop = useCallback(() => {
    emit(constants.EVENTS.VIZ_RESIZE, {});
  }, []);

  const handleOnDelete = useCallback((viz: any) => {
    setVizAddedToDashboard((old: any) =>
      old.filter((item: ObjectType) => item.gridItemId !== viz.gridItemId),
    );
    setGridLayouts((old: any) => ({
      ...old,
      lg: old.lg.filter((item: ObjectType) => item.i !== viz.gridItemId),
    }));
  }, []);

  const handleOnUpdateVizName = useCallback(
    (gridItemId: string, name: string) =>
      setVizAddedToDashboard((old: any) =>
        old.map((viz: any) => {
          if (viz.gridItemId === gridItemId) {
            return { ...viz, name };
          } else {
            return viz;
          }
        }),
      ),
    [],
  );

  return (
    <>
      {(isGetProjectDetailsPending ||
        isGetAllVizPending ||
        isCreateDashboardPending ||
        dashboardVizDetails?.pending ||
        isUpdateDashboardPending ||
        isPublishDashboardPending ||
        isGetDashboardPending) && <Loader fullScreen />}
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
              <Row gutter={8}>
                <Col>
                  <Button
                    type='primary'
                    onClick={modeSpecificConfig.onSave}
                    disabled={!name || !vizAddedToDashboard || !vizAddedToDashboard.length}
                  >
                    {modeSpecificConfig.saveBtnLabel}
                  </Button>
                </Col>
                {mode === EDIT && (
                  <Col>
                    <Button onClick={handleOnPublish} disabled={disablePublish}>
                      Publish
                    </Button>
                  </Col>
                )}
              </Row>
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
          <DashboardCanvas
            layouts={gridLayouts}
            onDrop={handleOnDrop}
            onLayoutChange={handleOnLayoutChange}
            onResizeStop={handleOnResizeStop}
            isDroppable={true}
            isResizable={true}
            measureBeforeMount={false}
            rowHeight={50}
            useCSSTransforms={false}
            className='react-grid-layout min-h-[400px] bg-white border-[1px] border-solid  border-gray-100 rounded-[4px]'
          >
            {vizAddedToDashboard.map((viz: ObjectType, index: number) => {
              return (
                <div
                  key={viz.gridItemId}
                  className='bg-white shadow-md shadow-lg p-[16px] rounded-[4px]'
                >
                  <Row
                    gutter={8}
                    className='absolute w-full right-[16px] top-[4px]'
                    justify='end'
                    align='middle'
                  >
                    <Col>
                      <Button
                        icon={<DeleteOutlined />}
                        onClick={() => handleOnDelete(viz)}
                        shape='circle'
                      ></Button>
                    </Col>
                  </Row>
                  <VisualCard
                    id={viz.gridItemId}
                    config={viz.config}
                    loading={executeQueries[index]?.isPending}
                    data={executeQueries[index]?.data}
                    name={viz.name}
                    preview={false}
                    updateVizName={handleOnUpdateVizName}
                  />
                </div>
              );
            })}
          </DashboardCanvas>
        </Col>
      </Row>
    </>
  );
};

export default CreateDashboard;
