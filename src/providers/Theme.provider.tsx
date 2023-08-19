import { ConfigProvider, App } from "antd";
const themeConfig = {
  token: {
    colorPrimary: "#06202c",
  },
};

export const ThemeProvider = ({ children }: { children: JSX.Element }) => (
  <ConfigProvider theme={themeConfig}>
    <App>{children}</App>
  </ConfigProvider>
);
