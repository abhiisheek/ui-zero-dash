import { useState } from "react";
import { Row, Col, Button } from "antd";

import CreateProject from "./CreateProject";
import ProjectList from "./ProjectList";
import Breadcrumb from "@/components/Breadcrumb";

const Projects = () => {
  const [openCreateProject, setOpenCreateProject] = useState(false);

  const handleOnCreateProject = () => {
    setOpenCreateProject(true);
  };

  const handleOnCreateProjectCancel = () => {
    setOpenCreateProject(false);
  };

  return (
    <Row gutter={8}>
      <Breadcrumb
        items={[
          { title: "Home", path: "/" },
          { title: "Projects", path: "/projects" },
        ]}
      />
      <Col span={24}>
        <Row justify={"end"} align={"middle"} gutter={16}>
          <Col>
            <Button type='primary' shape='round' onClick={handleOnCreateProject}>
              Create Project
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <ProjectList />
          </Col>
        </Row>
      </Col>
      <CreateProject open={openCreateProject} onCancel={handleOnCreateProjectCancel} />
    </Row>
  );
};

export default Projects;
