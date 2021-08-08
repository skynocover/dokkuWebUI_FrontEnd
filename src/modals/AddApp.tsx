import React from 'react';
import ReactDOM from 'react-dom';
import { ColumnsType } from 'antd/lib/table';
import * as antd from 'antd';

import { PrimaryButton } from '../components/PrimaryButton';
import { AppContext } from '../AppContext';
import { Notification } from '../components/Notification';

const AddApp = () => {
  const appCtx = React.useContext(AppContext);

  React.useEffect(() => {}, []);

  const onFinish = async (values: any) => {
    appCtx.setModal(null);

    const data = await appCtx.fetch('post', `/api/app/${values.appName}`, [
      values.domain,
    ]);

    if (data) {
      Notification.add('success', 'Success Add');
      await appCtx.getApps();
    }
  };

  return (
    <antd.Form onFinish={onFinish}>
      <h5 className="font-weight-bold mb-4">Add Domain</h5>

      <antd.Form.Item
        name="appName"
        rules={[{ required: true, message: 'Input AppName' }]}
      >
        <antd.Input
          prefix={<i className="fa fa-desktop" />}
          placeholder="Please input AppName"
        />
      </antd.Form.Item>

      <antd.Form.Item className="text-center">
        <PrimaryButton title="Add" htmlType="submit" />
      </antd.Form.Item>
    </antd.Form>
  );
};

export { AddApp };
