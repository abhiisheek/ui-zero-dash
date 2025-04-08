import { useState, useEffect } from "react";
import { Row, Col, Button } from "antd";
import { useParams, useNavigate, useLocation } from "react-router";

import { useProject } from "@/query/project";

import Breadcrumb from "@/components/Breadcrumb";
import { ProjectContext } from "@/context/ProjectContext";
import Loader from "@/components/Loader";

import DashboardList from "./DashboardList";

const Dashboards = () => {
  const { projectId } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { mutate, isPending } = useProject();
  const [projectDetails, setProjectDetails] = useState<any>({});

  useEffect(() => {
    if (projectId) {
      mutate(projectId, {
        onSuccess: (data) => setProjectDetails(data),
      });
    }
  }, [projectId]);

  const handleOnCreateDashboard = () => {
    navigate(`${pathname}/create`)
  };

  return (
    <ProjectContext.Provider value={projectDetails}>
      {isPending && <Loader fullScreen />}
      <Row gutter={8}>
        <Breadcrumb
          items={[
            { title: "Home", path: "" },
            { title: "Projects", path: "/projects" },
            { title: projectDetails?.name || "Project Name", path: `/${projectId}` },
            { title: "Dashboards", path: `/dashboards` },
          ]}
        />
        <Col span={24}>
          <Row justify={"end"} align={"middle"} gutter={16}>
            <Col>
              <Button type='primary' shape='round' onClick={handleOnCreateDashboard}>
                Create Dashboard
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DashboardList />
            </Col>
          </Row>
        </Col>
      </Row>
    </ProjectContext.Provider>
  );
};

export default Dashboards;
