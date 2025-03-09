import React, { useState } from "react";
import { Typography, Modal, Input, Checkbox, Row, Col, Alert, notification } from "antd";

import Loader from "@/components/Loader";
import { useCreateProject } from "@/query/project";

interface CreateProjectProps {
  open: boolean;
  onCancel: () => void;
}

const CreateProject: React.FC<CreateProjectProps> = ({ open, onCancel }) => {
  const [notifier, contextHolder] = notification.useNotification();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [authRoles, setAuthRoles] = useState("");
  const [dbDetails, setDBDetails] = useState({ host: "", port: "", user: "", password: "" });
  const [isPublic, setIsPublic] = useState(false);

  const { mutate, isPending } = useCreateProject();

  const handleCreate = () => {
    console.log("Project Created:", { name, description, isPublic });
    mutate(
      {
        name,
        description,
        public: isPublic,
        authorisationRoles: authRoles,
        additionalConfig: {},
        db: dbDetails,
      },
      {
        onSuccess: () => {
          notifier.success({ message: "Project Created Successfully" });
          reset();
          onCancel();
        },
      },
    );
  };

  const reset = () => {
    setName("");
    setDescription("");
    setAuthRoles("");
    setDBDetails({ host: "", port: "", user: "", password: "" });
    setIsPublic(false);
  };

  return (
    <Modal
      title='Create Project'
      open={open}
      onCancel={onCancel}
      onOk={handleCreate}
      okText='Create'
    >
      {isPending && <Loader fullScreen />}
      {isPublic && (
        <Alert message='Note: Public Projects can be accessed by everyone.' type='info' showIcon />
      )}
      <div className='pt-[8px]'>
        <div className='mb-2'>
          <Input
            placeholder='Project Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='mb-2'>
          <Input.TextArea
            placeholder='Project Description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className='mb-2'>
          <Checkbox checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)}>
            Public
          </Checkbox>
        </div>
        {!isPublic && (
          <div className='mb-2'>
            <Input
              placeholder='Authoritsation Roles'
              value={authRoles}
              onChange={(e) => setAuthRoles(e.target.value)}
            />
          </div>
        )}
        <Typography.Title level={5}>Data Source Details</Typography.Title>
        <Row gutter={[8, 8]}>
          <Col span={18}>
            <Input
              placeholder='Host Name'
              value={dbDetails.host}
              onChange={(e) => setDBDetails((old) => ({ ...old, host: e.target.value }))}
            />
          </Col>
          <Col span={6}>
            <Input
              placeholder='Port'
              type='number'
              value={dbDetails.port}
              onChange={(e) => setDBDetails((old) => ({ ...old, port: e.target.value }))}
            />
          </Col>
          <Col span={12}>
            <Input
              placeholder='User Name'
              value={dbDetails.user}
              onChange={(e) => setDBDetails((old) => ({ ...old, user: e.target.value }))}
            />
          </Col>
          <Col span={12}>
            <Input
              placeholder='Password'
              type='password'
              value={dbDetails.password}
              onChange={(e) => setDBDetails((old) => ({ ...old, password: e.target.value }))}
            />
          </Col>
        </Row>
        {contextHolder}
      </div>
    </Modal>
  );
};

export default CreateProject;
