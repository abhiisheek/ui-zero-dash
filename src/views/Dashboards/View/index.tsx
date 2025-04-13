import { FC, useCallback, useContext, useEffect, useState } from "react";

import { Row, Col, Typography } from "antd";
import { useParams } from "react-router";

import { ObjectType } from "@/types";
import constants from "@/constants/constants";
import Breadcrumb from "@/components/Breadcrumb";
import { useProject, useDashboard, useDashboardVisuals } from "@/query/project";
import { useExecuteQueries } from "@/query/db";
import { AppContext } from "@/context/AppContext";
import Loader from "@/components/Loader";
import VisualCard from "@/components/Visualisation/VisualCard";
import DashboardCanvas from "@/components/DashboardCanvas";
import { emit } from "@/utils/emitter";

const {} = constants;

const ViewDashboard: FC<ObjectType> = ({ mode }) => {
  const { projectId, dashboardId } = useParams();
  const [gridLayouts, setGridLayouts] = useState<any>({ lg: [] });
  const [projectDetails, setProjectDetails] = useState<any>({});
  const { mutate: getProjectDetails, isPending: isGetProjectDetailsPending } = useProject();
  const { setState } = useContext(AppContext);
  const { mutate: getDashboard, isPending: isGetDashboardPending } = useDashboard();
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
          })),
        );
        setGridLayouts(() => {
          const formattedLayouts = dashboardDetails?.config?.layout || {};
          const breakpoints = Object.keys(formattedLayouts);

          breakpoints.forEach((breakpoint: string) => {
            if (formattedLayouts[breakpoint]) {
              formattedLayouts[breakpoint] = formattedLayouts[breakpoint].map((item: any) => ({
                ...item,
                static: true,
              }));
            }
          });

          return (
            formattedLayouts || {
              lg: [],
            }
          );
        });
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

  useEffect(() => setState((old: ObjectType) => ({ ...old, viewName: "Dashboard" })), []);

  useEffect(() => {
    if (projectId) {
      getProjectDetails(projectId, {
        onSuccess: (data: ObjectType) => setProjectDetails(data),
      });
    }
  }, [projectId]);

  useEffect(() => {
    if (projectId && dashboardId) {
      getDashboard(
        { projectId, dashboardId },
        {
          onSuccess: (data: ObjectType) => {
            if (Array.isArray(data) && data.length) {
              const details = data[0];
              setDashboardDetails(details);
            }
          },
        },
      );
    }
  }, [projectId, dashboardId, mode]);

  const handleOnLayoutChange = useCallback((currentLayout: any) => {
    setGridLayouts((old: any) => ({ ...old, lg: currentLayout }));
  }, []);

  const handleOnResizeStop = useCallback(() => {
    emit(constants.EVENTS.VIZ_RESIZE, {});
  }, []);

  return (
    <>
      {(isGetProjectDetailsPending || dashboardVizDetails?.pending || isGetDashboardPending) && (
        <Loader fullScreen />
      )}
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Breadcrumb
            items={[
              { title: "Home", path: "" },
              { title: "Projects", path: "/projects" },
              { title: projectDetails?.name || "Project Name", path: `/${projectId}/dashboards` },
              // { title: "Dashboards", path: `/dashboards` },
              { title: dashboardDetails?.name || "Dashboard", path: `/dashboards` },
            ]}
          />
        </Col>
        <Col span={24}>
          <Typography.Title
            level={4}
            className='py-[16px] px-[4px] bg-white !mb-[-12px] rounded-[4px]'
          >
            {dashboardDetails?.name}
          </Typography.Title>
        </Col>
        <Col span={24}>
          <DashboardCanvas
            layouts={gridLayouts}
            onLayoutChange={handleOnLayoutChange}
            onResizeStop={handleOnResizeStop}
            isDroppable={false}
            isDraggable={false}
            isResizable={false}
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
                  <VisualCard
                    id={viz.gridItemId}
                    config={viz.config}
                    loading={executeQueries[index]?.isPending}
                    data={executeQueries[index]?.data}
                    name={viz.name}
                    static={true}
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

export default ViewDashboard;
