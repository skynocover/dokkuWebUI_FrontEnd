import React from 'react';
import ReactDOM from 'react-dom';
import { AppContext } from '../AppContext';
import * as antd from 'antd';

const LaunchPage = () => {
  const appCtx = React.useContext(AppContext);

  React.useEffect(() => {
    const init = async () => {
      const data = await appCtx.fetch('get', '/account/redirect');
      window.location.href = data ? appCtx.homePage : appCtx.loginPage;
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
  return <></>;
};

export { LaunchPage, LoginPage, NotFoundPage };
