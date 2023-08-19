import { LOGO_URL } from "~constants";

import styles from "./Layout.module.scss";

export const Layout = ({ children }: { children: JSX.Element }) => {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.left}>
        <img src={LOGO_URL} />
      </div>
      <div className={styles.right}>{children}</div>
    </div>
  );
};
