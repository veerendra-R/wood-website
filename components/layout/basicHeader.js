// import React from 'react';
// import { Breadcrumb, Layout, Menu, theme } from 'antd';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
// import styles from './layout.module.scss'
// import mainLogo from '../../public/uploads/WkndLogo.svg'
// import Image from 'next/image';
// const { Header, Content, Footer } = Layout;
// const App = () => {
//   const {
//     token: { colorBgContainer },
//   } = theme.useToken();
//   const router = useRouter();

//   const routeToKey = {
//     '/pages/about/about.js': 'home',
//     '/about': 'about',
//     '/contact': 'contact',
//   };
//   const selectedKey = routeToKey[router.pathname] || 'home';
//   return (
//     <Layout className="layout">
//       <Header
//       >
//       <Menu mode="horizontal" selectedKeyselectedKeys={[selectedKey]} className={styles.mainMenu}>
//         <div className="mainLogo"><Image src={mainLogo} alt="The Weekend Door"/></div>
//       <Menu.Item key="home">
//         <Link href="/home">
//           Home
//         </Link>
//       </Menu.Item>
//       <Menu.Item key="about">
//         <Link href="/about">
//           About
//         </Link>
//       </Menu.Item>
//       <Menu.Item key="contact">
//         <Link href="/contact">
//           Contact
//         </Link>
//       </Menu.Item>
//       <Menu.Item key="services">
//         <Link href="/home">
//           Services
//         </Link>
//       </Menu.Item>
//     </Menu>
//       </Header>
//     </Layout>
//   );
// };
// export default App;

import React, { useEffect, useState } from "react";
import { Button, Drawer, Layout, Menu, theme, Affix } from "antd";

import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./layout.module.scss";
import mainLogoMob from "../../public/uploads/WkndLogoMob.svg";
import mainLogo from "../../public/uploads/WkndLogo.svg";
import menuIcon from "../../public/Burger Menu-ICON.svg";

import Image from "next/image";
import { MenuOutlined } from "@ant-design/icons";
import SidebarMenu from "./sidermenu";

const { Header, Content, Footer } = Layout;
const App = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const router = useRouter();

  const routeToKey = {
    "/pages/about/about.js": "home",
    "/about": "about",
    "/contact": "contact",
    "/properties": "properties",
    "/service":"servicePage"
  };
  // const selectedKey = routeToKey[router.pathname] || "home";
  const [activeKey, setActiveKey] = useState("home");

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    const handleMediaQueryChange = (e) => {
      setIsMobile(e.matches);
    };

    // Initialize isMobile based on the current window width
    setIsMobile(mediaQuery.matches);

    // Listen for changes in the media query
    mediaQuery.addListener(handleMediaQueryChange);

    // Cleanup the listener when the component is unmounted
    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
    setIsMobile(windowWidth <= 500); // Set isMobile based on window width
  }, [windowWidth]);

  const showDrawer = () => {
    setVisible(true);
  };

  const handleMenuClick = () => {
    setVisible(false); // Close the drawer when a menu item is clicked
  };

  const onClose = (e) => {
    setVisible(false);
    setActiveKey(e.key);
  };
  useEffect(() => {
    // Get the current path from the router object
    const currentPath = router.asPath;

    // Set the active key based on the URL
    if (currentPath.includes("properties")) {
      setActiveKey("properties");
    } else if (currentPath === "/home") {
      setActiveKey("home");
    } else if (currentPath === "/about") {
      setActiveKey("about");
    } else if (currentPath === "/contact") {
      setActiveKey("contact");
    }else if (currentPath === "/servicePage") {
      setActiveKey("Partner with us");
    }
  }, [router.asPath]);

  const handlLogoClick = () => {
    router.push("/home");
  };
  const items = [
    { label: "Home", route: "/" },
    { label: "About", route: "/about" },
    { label: "Contact", route: "/contact" },
    {label:"Partner with us",route:"/servicePage"}
  ];

  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const closeDrawer = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isMobile ? (
        // <Affix offsetTop={0.1}>
        // <div className={styles.mobileMenu}>
        //   <span className={styles.mobileLogo} onClick={handlLogoClick}>
        //     <Image src={mainLogoMob} alt="The Weekend Door" onClick={handlLogoClick}/>
        //   </span>
        //   <div onClick={showDrawer} className={styles.menuIconDiv}>
        //     <Image src={menuIcon} alt="The Weekend Door" onClick={showDrawer} />
        //   </div>
        //   <Drawer
        //     title="Menu"
        //     placement="right"
        //     closable={true}
        //     onClose={onClose}
        //     visible={visible}
        //     width={300}
        //     defaultActiveFirst={"home"}
        //   >
        //     <Menu onClick={handleMenuClick} selectedKeys={[activeKey]}>
        //       <Menu.Item key="home">
        //         <Link href="/home">Home</Link>
        //       </Menu.Item>
        //       <Menu.Item key="properties">
        //         <Link href="/properties">Properties</Link>
        //       </Menu.Item>
        //       <Menu.Item key="about">
        //         <Link href="/about">About</Link>
        //       </Menu.Item>
        //       <Menu.Item key="contact">
        //         <Link href="/contact">Contact Us</Link>
        //       </Menu.Item>
        //     </Menu>
        //   </Drawer>
        // </div>
        // </Affix>
        // <div className={styles.mobileMenuWrapper}>
        <>
          {/* <span className={styles.mobileLogo} onClick={handlLogoClick}>
              <Image
                src={mainLogoMob}
                alt="The Weekend Door"
                onClick={handlLogoClick}
              />
            </span>
            <div onClick={showDrawer} className={styles.menuIconDiv}>
              <Image
                src={menuIcon}
                alt="The Weekend Door"
                onClick={showDrawer}
              />
            </div>
            <Drawer
              title="Menu"
              placement={"bottom"}
              closable={true}
              onClose={onClose}
              open={visible}
              width={300}
              defaultActiveFirst={"home"}
              zIndex={1000}
              // bodyStyle={{ overflowY: "auto" }}
            >
              <Menu onClick={handleMenuClick} selectedKeys={[activeKey]}>
                <Menu.Item key="home">
                  <Link href="/home">Home</Link>
                </Menu.Item>
                <Menu.Item key="properties">
                  <Link href="/properties">Properties</Link>
                </Menu.Item>
                <Menu.Item key="about">
                  <Link href="/about">About</Link>
                </Menu.Item>
                <Menu.Item key="contact">
                  <Link href="/contact">Contact Us</Link>
                </Menu.Item>
              </Menu>
            </Drawer> */}
          <SidebarMenu/>
        </>
      ) : (
        // </div>
        <Layout className="layout">
          <Header>
            <Menu
              mode="horizontal"
              selectedKeys={[activeKey]}
              className={styles.mainMenu}
            >
              <div className="mainLogo">
                <Image
                  src={mainLogoMob}
                  alt="The Weekend Door"
                  onClick={handlLogoClick}
                />
              </div>
              <Menu.Item key="home">
                <Link href="/home">Home</Link>
              </Menu.Item>
              <Menu.Item key="about">
                <Link href="/about">About</Link>
              </Menu.Item>
              <Menu.Item key="properties">
                <Link href="/properties">Properties</Link>
              </Menu.Item>
              <Menu.Item key="Partner with us">
                <Link href="/servicePage">Partner with us</Link>
              </Menu.Item>
              <Menu.Item key="contact">
                <Link href="/contact">Contact Us</Link>
              </Menu.Item>
            </Menu>
          </Header>
        </Layout>
      )}
    </>
  );
};
export default App;
