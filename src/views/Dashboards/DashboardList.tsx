import React, { useContext, useEffect, useState } from "react";
import { Table, Badge, Row } from "antd";
import { Link } from "react-router-dom";
import { useParams } from "react-router";

import Loader from "@/components/Loader";
import { useDashboards } from "@/query/project";
import { ObjectType } from "@/types";
import { AppContext } from "@/context/AppContext";
import constants from "@/constants/constants";

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (name: any, dataItem: any) => (
      <Row align='middle'>
        <Link to={`/projects/${dataItem.projectId}/dashboards/${dataItem._id}`}>{name}</Link>
        {dataItem.public && <Badge count={"Public"} showZero color='#faad14' />}
      </Row>
    ),
  },
  {
    title: "Status",
    dataIndex: "published",
    key: "published",
    render: (published: boolean) => (published ? "Published" : "Draft"),
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

const DashboardList: React.FC<ObjectType> = ({ persona }) => {
  const { projectId = "" } = useParams();
  const { mutate, isPending } = useDashboards();
  const [dashboards, setDashboards] = useState<any[]>([]);
  const { setState } = useContext(AppContext);

  useEffect(() => setState((old: ObjectType) => ({ ...old, viewName: "Dashboards" })), []);

  useEffect(() => {
    mutate(projectId, { onSuccess: (data) => {
      if(persona === constants.PERSONAS.USER) {
        setDashboards(data.filter((dashboard: ObjectType) => dashboard.published));
      } else {
        setDashboards(data);
      }
    } });
  }, [mutate, projectId, persona]);

  return (
    <div className='container mx-auto py-4'>
      {isPending && <Loader fullScreen />}
      <Table dataSource={dashboards} columns={columns} />
    </div>
  );
};

export default DashboardList;
