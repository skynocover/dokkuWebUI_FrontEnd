import React from 'react';
import ReactDOM from 'react-dom';
import { ColumnsType } from 'antd/lib/table';
import * as antd from 'antd';

import { PrimaryButton } from '../components/PrimaryButton';
import { AppContext } from '../AppContext';
import { Notification } from '../components/Notification';

export const AddService = ({
  onSuccess,
  databaseName,
}: {
  onSuccess: Function;
  databaseName: string;
}) => {
  const appCtx = React.useContext(AppContext);

  React.useEffect(() => {}, []);

  const onFinish = async (values: any) => {
    appCtx.setModal(null);

    const data = await appCtx.fetch('post', `/api/dbservice/${databaseName}`, {
      service: values.service,
      password: values.password,
      rootPassword: values.rootPassword,
    });

    if (data) {
      Notification.add('success', 'Success Add');
      await appCtx.getApps();
      onSuccess();
    }
  };

  return (
    <antd.Form onFinish={onFinish}>
      <h5 className="font-weight-bold mb-4">Add Service</h5>

      <antd.Form.Item
        name="service"
        rules={[{ required: true, message: 'Input service name' }]}
      >
        <antd.Input
          prefix={<i className="fa fa-desktop" />}
          placeholder="Please input service name"
        />
      </antd.Form.Item>

      <antd.Form.Item
        name="password"
        rules={[{ required: true, message: 'Input Password' }]}
      >
        <antd.Input.Password
          prefix={<i className="fa fa-desktop" />}
          placeholder="Please input Password"
        />
      </antd.Form.Item>

      <antd.Form.Item
        name="rootPassword"
        rules={[{ required: true, message: 'Input Root Password' }]}
      >
        <antd.Input.Password
          prefix={<i className="fa fa-desktop" />}
          placeholder="Please input Root Password"
        />
      </antd.Form.Item>

      <antd.Form.Item className="text-center">
        <PrimaryButton title="Add" htmlType="submit" />
      </antd.Form.Item>
    </antd.Form>
  );
};
