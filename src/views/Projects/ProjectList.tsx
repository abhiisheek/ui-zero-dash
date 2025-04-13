import React, { useContext, useEffect, useMemo } from "react";
import { Table, Badge, Row, Typography } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import Loader from "@/components/Loader";
import { useProjects } from "@/query/project";
import { AppContext } from "@/context/AppContext";
import { ObjectType } from "@/types";
import { getUserRoles } from "@/utils/app";
import constants from "@/constants/constants";

// interface Project {
//   key: string;
//   name: string;
//   description: string;
//   createdBy: string;
//   public: boolean;
//   updatedBy: string;
//   updatedOn: string;
// }

const {
  PERSONAS: { ADMIN },
} = constants;

const ProjectList: React.FC<ObjectType> = ({ persona = ADMIN }) => {
  const { data: apiData, isLoading } = useProjects();
  const { setState } = useContext(AppContext);

  useEffect(() => setState((old: ObjectType) => ({ ...old, viewName: "Projects" })), []);

  const filteredProjects = useMemo(() => {
    if (persona === ADMIN) {
      if (!Array.isArray(apiData)) {
        return [];
      }

      return apiData.filter((project: any) => {
        const projectsAdminRoles = project.adminRoles;
        const userRoles = getUserRoles();

        if (!projectsAdminRoles || !userRoles) {
          return false;
        }

        return projectsAdminRoles.some((role: string) => userRoles.includes(role));
      });
    } else {
      return apiData;
    }
  }, [persona, apiData]);

  const columns = useMemo(() => {
    return [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (name: any, dataItem: any) => {
          if (persona === ADMIN) {
            return (
              <Row align='middle'>
                <Link to={`/projects/${dataItem._id}`}>{name}</Link>
                {dataItem.public && <Badge count={"Public"} showZero color='#faad14' />}
              </Row>
            );
          } else {
            const userRoles = getUserRoles();
            const hasAccess =
              dataItem.public ||
              dataItem.authorisationRoles.some((role: string) => userRoles.includes(role));

            if (hasAccess) {
              return (
                <Row align='middle'>
                  <Link to={`/user/projects/${dataItem._id}/dashboards`}>{name}</Link>
                  {dataItem.public && <Badge count={"Public"} showZero color='#faad14' />}
                </Row>
              );
            } else {
              return (
                <Row align='middle'>
                  <Typography.Text>{name}</Typography.Text>
                  <LockOutlined />
                </Row>
              );
            }
          }
        },
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
  }, [persona]);

  return (
    <div className='container mx-auto py-4'>
      {isLoading && <Loader fullScreen />}
      <Table dataSource={filteredProjects || []} columns={columns} />
    </div>
  );
};

export default ProjectList;
