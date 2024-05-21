// app/components/Footer.js

import { Button, Divider, Modal } from "antd"; // Import Modal component from Ant Design
import React, { useEffect, useState } from "react";
import {
  InstagramOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  ArrowRightOutlined,
  YoutubeOutlined,
  FacebookOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import styles from "./footer.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";
import PrivacyPolicy from "../privacyPolicy";
import TermsandConditons from "../termsandConditons";

const FooterComponent = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isPrivacyPolicyVisible, setIsPrivacyPolicyVisible] = useState(false); 
  const [isPrivacyPolicyModal,SetIsPrivacyPolicyModal] = useState(false)
  const [isTermsModal,SetIsTermsModal] = useState(false)
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  useEffect(() => {
    setIsMobile(windowWidth <= 500); 
  }, [windowWidth]);
  const router = useRouter();

  const handleContactClick = () => {
    router.push("/contact");
  };

  const handlePrivacyPolicyClick = () => {
    setIsPrivacyPolicyVisible(true);
    SetIsPrivacyPolicyModal(true) 
  };

  const handleTermsandConditionClick  = ()=>{
    setIsPrivacyPolicyVisible(true);
    SetIsTermsModal(true)
    
  }

  const handlePrivacyPolicyCancel = () => {
    setIsPrivacyPolicyVisible(false); 
    SetIsTermsModal(false)
    SetIsPrivacyPolicyModal(false) 
  };
  

  return (
    <div className={styles.footerMain}>
      <div className={styles.stylesFooterMain}>
        <div className={styles.stylesFooterMain}>
          <div className={styles.stylesTitleSection}>
            {/* We would love to hear from you
            <button
              shape="round"
              onClick={handleContactClick}
              className={styles.contactBtn}
            >
              Contact Us <ArrowRightOutlined className={styles.arrowSignOMob} />
            </button> */}
             {!isMobile && (
          <div className={styles.stylesLogoSection}>
            <img src="wkndfoo.png" alt="Your Logo" />
          </div>
        )}
          </div>
          <div className={styles.cntctDeatilsAndLinks_3}>
            <div className={styles.footerTxta_1}>Email</div>
            <div className={styles.footerTxta_2}>
              enquiry@theweekenddoor.com
            </div>
            <div className={styles.footerTxta_1}>Contact</div>
            <div className={styles.footerTxta_2}>+91 9988337646</div>
            <div className={styles.footerTxta_2}>+91 9646867646</div>

           {isMobile && <div className={styles.stylesSocialMediaIconsMobile}>
              <a
                href="https://www.instagram.com/theweekendoor?igsh=ZHZuNnJta3EyaHVw"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramOutlined className="socialIocns" />
              </a>
              <a
                href="https://www.linkedin.com/company/the-weekend-door/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinOutlined className="socialIocns" />
              </a>
              <a
                href="https://www.facebook.com/p/The-Weekend-Door-100086179854416/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookOutlined className="socialIocns" />
              </a>
              <a
                 href="https://youtube.com/@Theweekendoor?si=TljiTTQrSadFZxtd"
                 target="_blank"
                 rel="noopener noreferrer"
              >
                <YoutubeOutlined className="socialIocns" />
              </a>
            </div>}
          </div>
          <div className={styles.LastFooterContent}>
          {!isMobile && (
            
            <div className={styles.stylesLinksSection}>
              <div>
                <Link href="/home">Home</Link>
              </div>
              <div>
                <Link href="/about">About</Link>
              </div>
              <div>
                <Link href="/properties">Properties</Link>
              </div>
              <div>
                <Link href="/servicePage">Partner with us</Link>
              </div>
              <div>
                <Link href="/contact">Contact Us</Link>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
      <div className={styles.stylesFooterSection}>
        {/* {!isMobile && (
          <div className={styles.stylesLogoSection}>
            <img src="wkndfoo.png" alt="Your Logo" />
          </div>
        )} */}
        {isMobile && <div className={styles.policyLinks}>
          <div className={styles.pandt}>
            <div
              onClick={handleTermsandConditionClick}
              className={styles.tandcBtn}
            >
              T&C
            </div>
            <div onClick={handlePrivacyPolicyClick} className={styles.pandpBtn}>
              Privacy & Policy
            </div>
          </div>
          <div>© {new Date().getFullYear()} The Weekenddoor</div>
        </div>}
        {!isMobile && (
          <div className={styles.LastFooterContent}>
          <div>© {new Date().getFullYear()} The Weekend Door</div>
          <div className={styles.stylesSocialMediaIconsMobile}>
              <a
                href="https://www.instagram.com/theweekendoor?igsh=ZHZuNnJta3EyaHVw"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramOutlined className="socialIocns" />
              </a>
              <a
                href="https://www.linkedin.com/company/the-weekend-door/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LinkedinOutlined className="socialIocns" />
              </a>
              <a
                href="https://www.facebook.com/p/The-Weekend-Door-100086179854416/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookOutlined className="socialIocns" />
              </a>
              <a
                 href="https://youtube.com/@Theweekendoor?si=TljiTTQrSadFZxtd"
                 target="_blank"
                 rel="noopener noreferrer"
              >
                <YoutubeOutlined className="socialIocns" />
              </a>
            </div>
          <div className={styles.PrvacyandTerms}>
            <div
              onClick={handleTermsandConditionClick}
              className={styles.PrvacyandTermscBtn}
            >
              T&C
            </div>
            <div onClick={handlePrivacyPolicyClick} className={styles.PrvacyandTermsBtn}>
              Privacy & Policy
            </div>
          </div>
          </div>
        )}
      </div>
      <Modal
        title={
          !isTermsModal ? (
            <div className={styles.modalTitle}>{"Privacy & Policy"}</div>
          ) : (
            <div className={styles.modalTitle}>{"Terms & Conditions"}</div>
          )
        }
        visible={isPrivacyPolicyVisible}
        onCancel={handlePrivacyPolicyCancel}
        footer={null}
        width={800}
      >
        <div className={styles.policyContent}>
          {!isTermsModal ? <PrivacyPolicy /> : <TermsandConditons />}
        </div>
      </Modal>
    </div>
  );
};

export default FooterComponent;
