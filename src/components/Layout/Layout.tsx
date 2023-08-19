import { Avatar, Button, Layout as AntdLayout } from "antd";
import { Link, Outlet } from "react-router-dom";
import { LOGO_URL, RoutePath } from "~constants";

import { useAuth } from "~features/auth/hooks/useAuth";

import styles from "./Layout.module.scss";

const { Header, Content } = AntdLayout;

export const Layout = () => {
  const { logout } = useAuth();

  return (
    <AntdLayout className={styles.layout}>
      <Header className={styles.header}>
        <Link to={RoutePath.HOME}>
          <Avatar src={LOGO_URL} />
        </Link>
        <Button className={styles.logoutBtn} onClick={logout}>
          Logout
        </Button>
      </Header>
      <Content className={styles.main}>
        <Outlet />
      </Content>
    </AntdLayout>
  );
};
