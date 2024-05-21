// components/CustomDrawer.js

import React, { useState } from "react";
import Link from "next/link";
import styles from "./SidebarMenu.module.scss";
import menuIcon from "../../public/Burger Menu-ICON.svg";
import Image from "next/image";
import mainLogoMob from "../../public/uploads/WkndLogoMob.svg";

const CustomDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    handleClose();
  };

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.mobileLogo}>
          <Link href="/home">
            <a>
              <Image src={mainLogoMob} alt="The Weekend Door" />
            </a>
          </Link>
        </div>
        <div className={styles.burgerIcon} onClick={toggleDrawer}>
          <Image src={menuIcon} alt="The Weekend Door" onClick={toggleDrawer} />
        </div>
      </div>
      <div className={isOpen ? `${styles.drawer} ${styles.open}` : styles.drawer}>
        <div className={styles.closeIcon} onClick={handleClose}>
          &times;
        </div>
        <div className={styles.drawerContent}>
          <ul className={styles.menu}>
            <li className={activeMenu === 'Home' ? styles.active : ''} onClick={() => handleMenuClick('Home')}>
              <Link href="/home">
                <a>Home</a>
              </Link>
            </li>
            <li className={activeMenu === 'About' ? styles.active : ''} onClick={() => handleMenuClick('About')}>
              <Link href="/about">
                <a>About</a>
              </Link>
            </li>
            <li className={activeMenu === 'Properties' ? styles.active : ''} onClick={() => handleMenuClick('Properties')}>
              <Link href="/properties">
                <a>Properties</a>
              </Link>
            </li>
            <li className={activeMenu === 'Partner with us' ? styles.active : ''} onClick={() => handleMenuClick('Partner with us')}>
              <Link href="/servicePage">
                <a>Partner with us</a>
              </Link>
            </li>
            <li className={activeMenu === 'Contact' ? styles.active : ''} onClick={() => handleMenuClick('Contact')}>
              <Link href="/contact">
                <a>Contact</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomDrawer;
