// import { useState } from "react";
import { Row, Col, Button } from "antd";
import { useParams } from "react-router";

import Breadcrumb from "@/components/Breadcrumb";
import VisualisationList from "./VisualisationList";

const Visualisations = () => {
  const { projectId } = useParams();

  const handleOnCreateVisualisation = () => {
    
  };

  return (
    <Row gutter={8}>
      <Breadcrumb
        items={[
          { title: "Home", path: "" },
          { title: "Projects", path: "/projects" },
          { title: "Project Name", path: `/${projectId}` },
          { title: "Visualisations", path: `/visualisations` },
        ]}
      />
      <Col span={24}>
        <Row justify={"end"} align={"middle"} gutter={16}>
          <Col>
            <Button type='primary' shape='round' onClick={handleOnCreateVisualisation}>
              Create Visualisation
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <VisualisationList />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Visualisations;
