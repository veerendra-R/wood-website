import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import BasicHeader from "./basicHeader";
import { Layout, Space, Affix } from "antd";
import styles from "./layout.module.scss";
import Loadingspinner from "../Loadingspinner";

const { Header, Footer, Sider, Content } = Layout;
const NewPageLayout = ({ children }) => {
  const router = useRouter();
  const isHomePage = router?.pathname === "/" || router.pathname === "/home";
  console.log("isHomePage", isHomePage);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const loader = useSelector((state) => state?.loaderflag?.loader);

  console.log("loader",loader)


  useEffect(() => {
    setIsMobile(windowWidth <= 500); // Set isMobile based on window width
  }, [windowWidth]);
  return (
    <Layout>
       {loader ? <Loadingspinner /> : ""}
      {isMobile ? (
        <div className="mainMenu2">
            <BasicHeader />
        </div>
      ) : (
        <Header className="mainMenu2">
          <Affix offsetTop={0.1}>
            <BasicHeader />
          </Affix>
        </Header>
      )}
      <Layout>
          <Content>
        {children}
        </Content>
        <Layout>
          <Content
          ></Content>
        </Layout>
      </Layout>

      {/* <Footer className={styles.footerStyle}>©2023 Created by Ant UED</Footer> */}
    </Layout>
  );
};
export default NewPageLayout;
