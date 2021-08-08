import React from 'react';
import logo from './logo.svg';
import './App.css';
import { AppContext } from './AppContext';
import * as ReactRouterDOM from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { LaunchPage, LoginPage, NotFoundPage } from './pages/LaunchPage';
import { AppPage } from './pages/AppPage';
import { GlobalPage } from './pages/GlobalPage';
import * as cookie from 'js-cookie';

const App = () => {
  const appCtx = React.useContext(AppContext);

  const initialize = async () => {
    await appCtx.getApps();
  };

  React.useEffect(() => {
    let user = JSON.parse(cookie.get('user') || '{}');
    initialize();
  }, []);

  return (
    <ReactRouterDOM.HashRouter>
      <ReactRouterDOM.Switch>
        <ReactRouterDOM.Route path="/" exact component={LaunchPage} />
        <ReactRouterDOM.Route path="/login" component={LoginPage} />

        {appCtx.menus.map((item) => (
          <ReactRouterDOM.Route key={item.key} path={item.key}>
            <MainPage
              menus={appCtx.menus}
              title={item.title}
              icon={item.icon}
              content={item.component}
            />
          </ReactRouterDOM.Route>
        ))}

        <ReactRouterDOM.Route path="*" component={NotFoundPage} />
      </ReactRouterDOM.Switch>
    </ReactRouterDOM.HashRouter>
  );
};

export default App;
