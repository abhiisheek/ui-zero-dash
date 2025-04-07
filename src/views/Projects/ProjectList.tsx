import React, { useContext, useEffect } from "react";
import { Table, Badge, Row } from "antd";
import { Link } from "react-router-dom";

import Loader from "@/components/Loader";
import { useProjects } from "@/query/project";
import { AppContext } from "@/context/AppContext";
import { ObjectType } from "@/types";

// interface Project {
//   key: string;
//   name: string;
//   description: string;
//   createdBy: string;
//   public: boolean;
//   updatedBy: string;
//   updatedOn: string;
// }

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name: any, dataItem: any) => (
      <Row align='middle'>
        <Link to={`/projects/${dataItem._id}`}>{name}</Link>
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

const ProjectList: React.FC = () => {
  const { data: apiData, isLoading } = useProjects();
  const { setState } = useContext(AppContext);

  useEffect(() => setState((old: ObjectType) => ({ ...old, viewName: "Projects" })), []);

  return (
    <div className='container mx-auto py-4'>
      {isLoading && <Loader fullScreen />}
      <Table dataSource={apiData || []} columns={columns} />
    </div>
  );
};

export default ProjectList;
