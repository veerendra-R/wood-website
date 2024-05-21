import React from "react";
import Image from "next/image";
import styles from "./loadingspinner.module.scss";
import { Alert, Spin } from "antd";
import WKLodingSpinner from "../assets/vv.gif"

export default function Loadingspinner() {


  const removeGreenScreen = {
    filter: 'brightness(0.5) saturate(0)',
    backgroundColor: 'white', // Change this to the desired background color
  }
  return (
    
    <>
      <div className={styles.spinnerMainCls}></div>
      <div className={styles.spinnerImageDiv}>
        <Image className={styles.skLoadingSpinner} src={WKLodingSpinner} alt="" />
        {/* <Spin tip="Uploading..." size="large"/> */}
      </div>
    </>
  );
}
