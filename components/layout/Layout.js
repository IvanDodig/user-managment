import { Layout as AntLayout } from "antd";
import Link from "next/link";
import styles from "./Layout.module.css";

const { Content, Footer, Header } = AntLayout;
const Layout = ({ children }) => {
  return (
    <>
      <AntLayout>
        <Header className={styles.header}>
          <Link href={"/"}>User managment</Link>
        </Header>
        <Content className={styles.content}>{children}</Content>
        <Footer className={styles.footer}>2022</Footer>
      </AntLayout>
    </>
  );
};

export default Layout;
