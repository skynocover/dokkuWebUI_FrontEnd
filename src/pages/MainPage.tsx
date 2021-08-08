import React from 'react';
import * as antd from 'antd';
import { useHistory } from 'react-router-dom';

import { AppContext } from '../AppContext';

export default interface Menu {
  key: string;
  title: string;
  component: JSX.Element;
  icon: string;
}

interface MainPageProps {
  menus: Menu[];
  title: string;
  icon: string;
  content: JSX.Element;
}

const MainPage = ({ menus, title, icon, content }: MainPageProps) => {
  const appCtx = React.useContext(AppContext);
  const history = useHistory();

  const renderHeader = () => {
    return (
      <antd.Layout.Header
        className="d-flex align-items-center px-3 bg-white shadow-sm"
        style={{ zIndex: 1 }}
      >
        <div>
          <i className={icon} />
          <span className="ml-2">{title}</span>
        </div>

        <div className="flex-fill" />
        <antd.Popover
          placement="bottom"
          content={
            <div className="d-flex flex-column">
              <antd.Button type="link" danger onClick={() => appCtx.logout()}>
                logout
              </antd.Button>
            </div>
          }
        >
          <antd.Button type="link" icon={<i className="fa fa-sign-out mr-2" />}>
            {`Logout`}
          </antd.Button>
        </antd.Popover>
      </antd.Layout.Header>
    );
  };

  const renderContent = () => {
    return (
      <antd.Layout.Content style={{ overflow: 'auto' }}>
        <div className="m-3">{content}</div>
      </antd.Layout.Content>
    );
  };

  const renderMenu = () => {
    return (
      <antd.Layout.Sider
        collapsible
        trigger={null}
        style={{ overflow: 'auto' }}
      >
        <antd.Menu
          theme="dark"
          mode="inline"
          selectedKeys={[window.location.hash.slice(1)]}
          defaultOpenKeys={[window.location.hash.slice(1)]}
          onClick={({ item, key }) => {
            history.push(key as string);
          }}
        >
          {menus.map((menu) => {
            return (
              <antd.Menu.Item key={menu.key}>
                <span className="d-flex align-items-center">
                  <div className="anticon">
                    <i className={menu.icon} />
                  </div>
                  <span>{menu.title}</span>
                </span>
              </antd.Menu.Item>
            );
          })}
        </antd.Menu>
      </antd.Layout.Sider>
    );
  };

  return (
    <antd.Layout className="vh-100">
      {renderMenu()}

      <antd.Layout className="bg-white">
        {renderHeader()}
        {renderContent()}
      </antd.Layout>
    </antd.Layout>
  );
};

export { MainPage };
