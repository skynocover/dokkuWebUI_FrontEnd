import React from 'react';
import axios from 'axios';
import * as antd from 'antd';
import firebase from 'firebase/app';

import { Notification } from './components/Notification';

import { AppPage } from './pages/AppPage';
import { GlobalPage } from './pages/GlobalPage';

interface AppContextProps {
  loginPage: string;
  homePage: string;
  setModal: (modal: React.ReactNode | null, width?: number) => void;

  account: string;
  setAccount: (value: string) => void;

  fetch: (
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    url: string,
    param?: any,
  ) => Promise<any>;

  login: (account: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  redirect: () => Promise<void>;

  globalDomain: string;
  setGlobalDomain: React.Dispatch<React.SetStateAction<string>>;

  getApps: () => Promise<void>;
  menus: any[];
  setMenus: React.Dispatch<React.SetStateAction<any[]>>;

  sshKeyUploaded: boolean | null;
  setSshKeyUploaded: React.Dispatch<React.SetStateAction<boolean | null>>;

  appNames: string[];
}

const AppContext = React.createContext<AppContextProps>(undefined!);

interface AppProviderProps {
  children: React.ReactNode;
}

const globalMenu = {
  key: '/global',
  title: 'Global',
  component: <GlobalPage />,
};

const AppProvider = ({ children }: AppProviderProps) => {
  const [loginPage] = React.useState('/#/login');
  const [homePage] = React.useState('/#/global');
  const [modal, setModal] = React.useState<any>(null);
  const [modalWidth, setModalWidth] = React.useState<number>(416);
  // const [modalWithWidth, setModalWithWidth] = React.useState<any>(null);

  const [account, setAccount] = React.useState('');
  const [menus, setMenus] = React.useState<any[]>([globalMenu]);
  const [appNames, setAppNames] = React.useState<string[]>([]);
  const [globalDomain, setGlobalDomain] = React.useState('');
  const [sshKeyUploaded, setSshKeyUploaded] = React.useState<boolean | null>(
    null,
  );
  // const [initialized, setInitialized] = React.useState<boolean>(false);
  /////////////////////////////////////////////////////

  React.useEffect(() => {
    redirect();
    axios.defaults.baseURL = '';
    axios.defaults.headers.common['Content-Type'] = 'application/json';
  }, []);

  const fetch = async (
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    url: string,
    param?: any,
  ) => {
    let data: any = null;

    try {
      const response = await axios({
        method,
        url,
        data: param,
      });
      console.log('response', response.data);

      if (response.data.errorCode === 3) {
        setSshKeyUploaded(false);
      } else {
        setSshKeyUploaded(true);
      }

      if (response.data.errorCode === 2) {
        window.location.href = loginPage;
        return null;
      }

      if (response.data.errorCode !== 0) {
        throw new Error(response.data.errorMessage);
      }

      data = response.data;
    } catch (error: any) {
      Notification.add('error', error.message);
    }

    return data;
  };

  const login = async (account: string, password: string): Promise<any> => {
    const data = await fetch('post', `/api/account/login`, {
      account,
      password,
    });

    setAccount(account);

    if (data) {
      if (data.errorCode === 0) {
        Notification.add('success', 'Login');
        window.location.href = homePage;
      } else {
        window.location.href = loginPage;
      }
    } else {
      window.location.href = loginPage;
    }
  };

  const logout = async () => {
    await fetch('post', '/api/account/logout', {});
    window.location.href = loginPage;
  };

  const redirect = async () => {
    const data = await fetch('get', `/api/redirect`);
    if (data) {
      window.location.href = homePage;
    }
  };

  const getApps = async () => {
    const data = await fetch('get', `/api/apps`);
    if (data) {
      let apps: string[] = [];
      const temp = data.list.map((item: any) => {
        apps.push(item);
        return {
          key: `/${item}`,
          title: item,
          component: <AppPage appName={item} />,
        };
      });
      setAppNames(apps);
      setMenus([globalMenu, ...temp]);
    }
  };

  /////////////////////////////////////////////////////

  return (
    <AppContext.Provider
      value={{
        loginPage,
        homePage,
        setModal: (modal: React.ReactNode | null, width: number = 520) => {
          setModalWidth(width);
          setModal(modal);
        },

        account,
        setAccount,

        fetch,

        login,
        logout,
        redirect,

        globalDomain,
        setGlobalDomain,

        getApps,
        menus,
        setMenus,

        sshKeyUploaded,
        setSshKeyUploaded,
        appNames,
      }}
    >
      {modal && (
        <antd.Modal
          visible={modal !== null}
          onOk={() => setModal(null)}
          onCancel={() => setModal(null)}
          footer={null}
          closable={false}
          width={modalWidth}
        >
          {modal}
        </antd.Modal>
      )}

      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
