import React from 'react';
import ReactDOM from 'react-dom';
import { ColumnsType } from 'antd/lib/table';
import * as antd from 'antd';
import * as cookie from 'js-cookie';

import { AppContext } from '../AppContext';
import { ReportTable } from '../table/ReportTable';
import { ProxyTable } from '../table/ProxyTable';
import { DomainTable } from '../table/DomainTable';
import { GitTable } from '../table/GitTable';
import { ConfigTable } from '../table/ConfigTable';
import { Log } from '../table/Log';

interface AppPageProp {
  appName: string;
}

const AppPage = ({ appName }: AppPageProp) => {
  const appCtx = React.useContext(AppContext);

  const initialize = async () => {};

  React.useEffect(() => {
    initialize();
  }, []);

  const tabChange = (key: string) => {};

  return (
    <>
      <antd.Tabs defaultActiveKey="1" onChange={tabChange}>
        <antd.Tabs.TabPane tab="Report" key="report">
          <ReportTable appName={appName} />
        </antd.Tabs.TabPane>

        <antd.Tabs.TabPane tab="Proxy" key="proxy">
          <ProxyTable appName={appName} />
        </antd.Tabs.TabPane>

        <antd.Tabs.TabPane tab="Domain" key="domain">
          <DomainTable appName={appName} />
        </antd.Tabs.TabPane>

        <antd.Tabs.TabPane tab="Git" key="git">
          <GitTable appName={appName} />
        </antd.Tabs.TabPane>

        <antd.Tabs.TabPane tab="Config" key="config">
          <ConfigTable appName={appName} />
        </antd.Tabs.TabPane>

        <antd.Tabs.TabPane tab="Log" key="log">
          <Log appName={appName} />
        </antd.Tabs.TabPane>
      </antd.Tabs>
    </>
  );
};

export { AppPage };
