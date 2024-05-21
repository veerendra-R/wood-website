// pages/contact.js
import React, { useEffect, useState } from "react";
import styles1 from "../properties/properties.module.scss";
// import styles from "./contact.module.scss";
import styles from './cntct.module.scss'
import styles3 from "../../components/layout/layout.module.scss";
import InquiryForm from "../../components/InquiryForm";
import {
  resetLoader,
  setLoader,
} from "../../components/reducers/reduxtoolkit/loaderSlice";
import { useDispatch } from "react-redux";

const Contact = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);
  const props = {
    fromContactPage: true,
  };
  useEffect(() => {
    setIsMobile(windowWidth <= 400); // Set isMobile based on window width
  }, [windowWidth]);
  const dispatch = useDispatch();

  return (
      <div class={styles.mainContainer}>
        <div class="contactMain2">
          <div class="titleTxt4">CONTACT US</div>
          <p class="tagline">We would love to hear from you!</p>
        </div>
        <div class={styles.contactContainer}>
          <div className={styles.contactDetailsDiv}>
            <div className={styles.contactDetails}>
              <div className={styles.title}>Email</div>
              <div className={styles.desc}>enquiry@theweekenddoor.com</div>
              <div className={styles.title2}>Contact</div>
              <div className={styles.desc}>+91 9988337646</div>
              <div className={styles.desc}>+91 9646867646</div>
            </div>
          </div>
          <div className={styles.inquiryForm}>
            <InquiryForm props={props}/>
          </div>
        </div>
      </div>
  );
};

export default Contact;


  {/* {isMobile &&
      <>
      <div className="contactMain">
        <div className={styles1.contactImage}>
          <div className={styles1.titleTxt4}>
            CONTACT US
            <br />
            <span className={styles.tagLine}>
              We would love to hear from you!
            </span>
          </div>
        </div>
      </div>
      <div className={styles.contactDetailsDiv}>
        <div className={styles.contactDetails}>
          <div className={styles.title}>Email</div>
          <div className={styles.desc}>enquiry@theweekenddoor.com</div>
          <div className={styles.title}>Contact</div>
          <div className={styles.desc}>+91 9988337646</div>
          <div className={styles.desc}>+91 9646867646</div>
        </div>
      </div>
      <div className={styles.inquiryForm}>
          <InquiryForm  props={props}/>
      </div>
      </>
      } */}