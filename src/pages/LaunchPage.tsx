import React from 'react';
import ReactDOM from 'react-dom';
import * as antd from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { AppContext } from '../AppContext';
import { Notification } from '../components/Notification';

const LaunchPage = () => {
  const appCtx = React.useContext(AppContext);

  React.useEffect(() => {
    const init = async () => {
      await appCtx.redirect();
    };

    init();
  }, []);
  return <></>;
};

const LoginPage = () => {
  const appCtx = React.useContext(AppContext);

  const LoginForm = () => {
    return (
      <antd.Form
        // initialValues={{ account: '', password: '' }}
        onFinish={(values) => appCtx.login(values.account, values.password)}
      >
        <antd.Form.Item
          name="account"
          rules={[{ required: true, message: 'Please Input Account!' }]}
        >
          <antd.Input
            prefix={<i className="fa fa-user" />}
            placeholder="Please input account"
          />
        </antd.Form.Item>

        <antd.Form.Item
          name="password"
          rules={[{ required: true, message: 'Please Input Password!' }]}
        >
          <antd.Input.Password
            prefix={<i className="fa fa-lock" />}
            placeholder="Please input password"
          />
        </antd.Form.Item>

        <antd.Form.Item className="text-center">
          <antd.Button type="primary" shape="round" htmlType="submit">
            Login
          </antd.Button>
        </antd.Form.Item>
      </antd.Form>
    );
  };

  return (
    <div className="d-flex align-items-center vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div
            className="col-4 m-4 text-center font-weight-bold"
            style={{ fontSize: '20px' }}
          >
            Dokku Web UI
          </div>
        </div>

        <div className="m-5" />

        <div className="row justify-content-center">
          <div className="col-4">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

const NotFoundPage = () => {
  return <>404</>;
};

const UploadPage = () => {
  const appCtx = React.useContext(AppContext);

  const props = {
    name: 'uploadfile',
    action: '/api/ssh/upload',

    async onChange(info: any) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        Notification.add('success', 'success upload!');
        await appCtx.redirect();
        // appCtx.setSshKeyUploaded(true);
        // window.location.href = appCtx.loginPage;
      } else if (info.file.status === 'error') {
        Notification.add('success', 'upload fail!');
      }
    },
  };
  return (
    <div className="d-flex align-items-center vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div
            className="col-4 m-4 text-center font-weight-bold"
            style={{ fontSize: '20px' }}
          >
            Please Upload SSH Key First
          </div>
        </div>

        <div className="m-5" />

        <div className="row justify-content-center">
          <antd.Upload {...props}>
            <antd.Button icon={<UploadOutlined />}>Click to Upload</antd.Button>
          </antd.Upload>
        </div>
      </div>
    </div>
  );
};

export { LaunchPage, LoginPage, NotFoundPage, UploadPage };
