import React, { useContext, useEffect, useState } from "react";
import { Table, Badge, Row } from "antd";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

import Loader from "@/components/Loader";
import { useVisuals } from "@/query/project";
import { ObjectType } from "@/types";
import { AppContext } from "@/context/AppContext";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name: any, dataItem: any) => (
      <Row align='middle'>
        <Link to={`/projects/${dataItem.projectId}/visualisations/${dataItem._id}`}>{name}</Link>
        {dataItem.public && <Badge count={"Public"} showZero color='#faad14' />}
      </Row>
    ),
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Created By",
    dataIndex: "createdBy",
    key: "createdBy",
  },
  {
    title: "Updated By",
    dataIndex: "updatedBy",
    key: "updatedBy",
  },
  {
    title: "Updated On",
    dataIndex: "updatedOn",
    key: "updatedOn",
    render: (date: string) => new Date(date).toLocaleDateString(),
  },
];

const VisualisationList: React.FC = () => {
  const { projectId = "" } = useParams();
  const { mutate, isPending } = useVisuals();
  const [visuals, setVisuals] = useState<any[]>([]);
  const { setState } = useContext(AppContext);

  useEffect(() => setState((old: ObjectType) => ({ ...old, viewName: "Visualisations" })), []);

  useEffect(() => {
    mutate(projectId, { onSuccess: (data) => setVisuals(data) });
  }, [mutate, projectId]);

  return (
    <div className='container mx-auto py-4'>
      {isPending && <Loader fullScreen />}
      <Table dataSource={visuals} columns={columns} />
    </div>
  );
};

export default VisualisationList;
