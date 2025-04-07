import { useEffect, useState, useContext } from "react";
import { Typography, Row, Col, Badge, Card } from "antd";
import { useParams, useNavigate } from "react-router";

import Loader from "@/components/Loader";
import Breadcrumb from "@/components/Breadcrumb";
import { useProject } from "@/query/project";
import { AppContext } from "@/context/AppContext";
import { ObjectType } from "@/types";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { mutate, isPending } = useProject();
  const [details, setDetails] = useState<any>({});
  const { setState } = useContext(AppContext);

  useEffect(
    () => setState((old: ObjectType) => ({ ...old, viewName: details?.name || "Projects" })),
    [details],
  );

  useEffect(() => {
    if (projectId) {
      mutate(projectId, {
        onSuccess: (data) => setDetails(data),
      });
    }
  }, [projectId]);

  const handleCardClick = (path: string) => {
    navigate(path);
  };

  return (
    <Row gutter={16} className='!px-[16px]'>
      <Breadcrumb
        items={[
          { title: "Home", path: "/" },
          { title: "Projects", path: "/projects" },
          { title: details.name || "Project Name", path: "/" },
        ]}
      />
      {isPending && <Loader fullScreen />}
      <Col span={24}>
        <Row gutter={16} align={"middle"}>
          <Col>
            <Typography.Title level={4} className='!mb-[0px]'>
              {details.name}
            </Typography.Title>
          </Col>
          <Col>
            <Badge count={"Public"} showZero color='#faad14' />
          </Col>
        </Row>
        <Row gutter={[8, 8]} align={"middle"} className='!mt-[8px]'>
          <Col span={24}>
            <Typography.Text>{details.description}</Typography.Text>
          </Col>
          <Col span={24}>
            <Typography.Text strong>Details :</Typography.Text>
          </Col>
          {details?.db?.host && (
            <Col span={24}>
              <Typography.Text>Data Source Host : {details.db.host}</Typography.Text>
            </Col>
          )}
          {details?.db?.port && (
            <Col span={24}>
              <Typography.Text>Port : {details.db.port}</Typography.Text>
            </Col>
          )}
          {details?.db?.user && (
            <Col span={24}>
              <Typography.Text>Username : {details.db.user}</Typography.Text>
            </Col>
          )}
          {details?.db?.schema && (
            <Col span={24}>
              <Typography.Text>Schema : {details.db.schema}</Typography.Text>
            </Col>
          )}
        </Row>
        <Row gutter={[16, 16]} className='!mt-[16px]'>
          <Col span={12}>
            <Card
              hoverable
              className='text-center shadow-lg border border-gray-200'
              onClick={() => handleCardClick(`/projects/${projectId}/visualisations`)}
            >
              <Typography.Title level={5}>Visualisations</Typography.Title>
            </Card>
          </Col>
          <Col span={12}>
            <Card
              hoverable
              className='text-center shadow-lg border border-gray-200'
              onClick={() => handleCardClick(`/projects/${projectId}/dashboards`)}
            >
              <Typography.Title level={5}>Dashboards</Typography.Title>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default ProjectDetails;
