// pages/contact.js
import React, { useEffect, useState } from "react";
import InquiryForm from "../../components/InquiryForm";
import { useDispatch } from "react-redux";
import { Button, Divider, Typography } from "antd";
import styles from "./servicepage.module.scss";
import { useRouter } from "next/router";
import {
  ArrowRightOutlined,
} from "@ant-design/icons";

const { Paragraph, Text } = Typography;

const ServicePage = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);
  const props = {
    fromContactPage: true,
    fromPartnerPage: true,
  };
  const router = useRouter();
  useEffect(() => {
    setIsMobile(windowWidth <= 400); // Set isMobile based on window width
  }, [windowWidth]);
  const dispatch = useDispatch();

  const description1 = `We are your key to transforming your villa/ luxury property into the most sought-after recreational spot for tourists, city folks and guests of Hyderabad.`;


  const description2=`Your property, our care. Listed with us, it's like having a caretaker, who also ensures you are earning from your investment.`

  const description3 = `We work with the top marketing & photography firms to make sure your property looks like the most vacation-friendly or occasion-friendly stay in the city. We don't just attract
  bookings; we create anticipation, making guests huddle up in excitement for their slice of luxury.`;

  const description4 = `The Weekend Door is committed to make your wallet happy without compromising on luxury. Collaborating closely with you, we strive to guarantee your investments yield returns that leave you more than satisfied`;

  const description5 = `We are your team who will be taking the calls, making the bookings, accommodating guests and ensuring a memorable stay from the moment they discover your property. We're the
  heartbeat, tirelessly ensuring your guests' every moment is nothing short of extraordinary.`;

  const description6 = `With a dedicated follower base looking to us for travel recommendations, we extend that spotlight to your property. Reach a wide audience eagerly searching for opulent vacations, extravagant events, and more with The Weekend Door.`;

  const description7 = `Looking to maximize your property's potential returns? At The Weekend Door, not only do we provide exceptional care and exposure, but we also offer you the option to lease your property.`;
 
  const vdescription1 = `We don't just manage, we maintain. We ensure your property stays pristine, welcoming, and always ready for a guest's getaway.`;

  const vdescription2 = `We craft narratives that resonate, making your space not just a stay but an experience. We are matchmakers THAT connect your property with the people who appreciate its unique narrative.`;

  const vdescription3 = `We monitor your property round the clock, so you can rest easy knowing it's in good hands. Our watchful security arrangements are always on duty.`;

  const vdescription4 =  `We're not just about spaces; we're about turning them into valuable places. Let us monetize your property, transforming it into an asset that makes you money while you sleep.`

  const handleContactClick = () => {
    router.push("/contact");
  };

  return (
    <div class={styles.mainContainer}>
      <div class="contactMain2">
        <div class="titleTxt4">Partner With Us</div>
        <p class="tagline">Know more about us!</p>
      </div>
      <div class={styles.contactContainer}>
        <div className={styles.contactDetailsDiv}>
          <div className={styles.contactDetails}>
            <div>
              <span className={styles.titleTxt2}>
                Welcome to The Weekend Door
              </span>
              <div className={styles.mainDesDiv}>
              <Paragraph className={styles.descTxt}>{description1} </Paragraph>
            </div>
              </div>

            {/* <Divider
              orientation="left"
              orientationMargin="0"
              className={styles.dividerLeft}
            > */}
              <span className={styles.titleTxt2}>
                Benefits of partnering with
                <br />
                The Weekend Door
              </span>
            {/* </Divider>/ */}
            {/* <div className={styles.mainDesDiv}>
              <span className={styles.SubTitles}>Maintained like owners</span>
              <Paragraph className={styles.descTxt}>{description2} </Paragraph>
            </div> */}
            <Divider className={styles.mainDivider} />
            <div className={styles.mainDesDiv}>
              <span className={styles.SubTitles}>
                Personalised marketing & photography 
              </span>
              <Paragraph className={styles.descTxt}>{description3} </Paragraph>
            </div>
            <Divider className={styles.mainDivider} />
            <div className={styles.mainDesDiv}>
              <span className={styles.SubTitles}>
                Pricing that brings optimal returns
              </span>
              <Paragraph className={styles.descTxt}>{description4} </Paragraph>
            </div>
            <Divider className={styles.mainDivider} />
            <div className={styles.mainDesDiv}>
              <span className={styles.SubTitles}>
                Dedicated boots on the ground
              </span>
              <Paragraph className={styles.descTxt}>{description5} </Paragraph>
            </div>
            <Divider className={styles.mainDivider} />
            <div className={styles.mainDesDiv}>
              <span className={styles.SubTitles}>
                Exposure to premium audience
              </span>
              <Paragraph className={styles.descTxt}>{description6} </Paragraph>
            </div>
            <Divider className={styles.mainDivider} />
            <div className={styles.mainDesDiv}>
              <span className={styles.SubTitles}>
                Leasing Opportunities for Your Property
              </span>
              <Paragraph className={styles.descTxt}>{description7} </Paragraph>
            </div>
            <Divider className={styles.mainDivider} />
            <div className={styles.mainDesDivCntct}>
            <div className={styles.imageOverlay}>

              <span className={styles.SubTitles}>
                Contact us today to know more!
              </span>
              <button
                shape="round"
                onClick={handleContactClick}
                className={styles.contactBtn}
              >
                Contact Us{" "}
                <ArrowRightOutlined className={styles.arrowSignOMob} />
              </button>
              </div>
            </div>
            <div className={styles.mainDesDivCntct2}>
              <span className={styles.titleTxt2}>EASY PARTNERING PROCESS</span>
            </div>
            <div className={styles.mainDesDivTimeline}>
              <div className={styles.container}>
                <div className={styles.timeline}>
                  {/* <div className={`${styles.timelineContainer} ${styles.primary}`}>
                <div className={styles.timelineIcon}>
                  <span>H</span>
                </div>
                <div className={styles.timelineBody}>
                  <h4 className={styles.timelineTitle}><span className={styles.badge}>Primary</span></h4>
                  <p className={styles.timelineSubtitle}>1 Hours Ago</p>
                </div>
              </div> */}

                  <div
                    className={`${styles.timelineContainer} ${styles.primary}`}
                  >
                    <div className={styles.timelineIcon}>
                    <img src="formFill.svg" alt="Your Logo" />
                    </div>
                    <div className={styles.timelineBody}>
                      <span>FILL THE FORM</span>
                    </div>
                  </div>
                  <div
                    className={`${styles.timelineContainer} ${styles.primary}`}
                  >
                    <div className={styles.timelineIcon}>
                    <img src="calback.svg" alt="Your Logo" />
                    </div>
                    <div className={styles.timelineBody}>
                      <span>GET A CALLBACK FROM US</span>
                    </div>
                  </div>
                  <div
                    className={`${styles.timelineContainer} ${styles.primary}`}
                  >
                    <div className={styles.timelineIcon}>
                    <img src="confirmation.svg" alt="Your Logo" />
                    </div>
                    <div className={styles.timelineBody}>
                      <span>CONFIRM PROPERTY DETAILS</span>
                    </div>
                  </div>
                  <div
                    className={`${styles.timelineContainer} ${styles.primary}`}
                  >
                    <div className={styles.timelineIcon}>
                    <img src="partener-svg.svg" alt="Your Logo" />
                    </div>
                    <div className={styles.timelineBody}>
                      <span>PARTNER WITHIN 48 HRS.</span>
                    </div>
                  </div>

                  {/* Other timeline items */}
                </div>
              </div>
            </div>
            <div className={styles.mainDesDivCntct}>
            <div className={styles.imageOverlay}>
              <span className={styles.SubTitles}>
                Time to put your property on the map!
              </span>
              <button
                shape="round"
                onClick={handleContactClick}
                className={styles.contactBtn}
              >
                Contact Us{" "}
                <ArrowRightOutlined className={styles.arrowSignOMob} />
              </button>
              </div>
            </div>

            <Divider
              orientation="left"
              orientationMargin="0"
              className={styles.dividerLeft}
            >
              <span className={styles.titleTxt2}>
              What The Weekend Door <br/>can do for  your Property
              </span>
            </Divider>
            <div className={styles.valueCards}>
            <div className={styles.valueCard1}>
              <img src={"maintain.svg"} className={styles.vcicon} />
              <div className={styles.vctitle}>MAINTAIN IT</div>
              <p className={styles.vcDesc}>{vdescription1} </p>
            </div>

            <div className={styles.valueCard1}>
              <img src={"market.svg"} className={styles.vcicon} />
              <div className={styles.vctitle}>MARKET IT</div>
              <p className={styles.vcDesc}>{vdescription2} </p>
            </div>

            <div className={styles.valueCard1}>
              <img src={"monitor.svg"} className={styles.vcicon} />
              <div className={styles.vctitle}>MONITOR IT</div>
              <p className={styles.vcDesc}>{vdescription3} </p>
            </div>

            <div className={styles.valueCard1}>
              <img src={"monisne.svg"} className={styles.vcicon} />
              <div className={styles.vctitle}>MONETISE IT</div>
              <p className={styles.vcDesc}>{vdescription4} </p>
            </div>
          </div>
          <Divider className={styles.mainDivider} />
            <div className={styles.mainDesDivCntct}>
            <div className={styles.imageOverlay}>
              <span className={styles.SubTitles}>
              Turn your property into a destination.
              </span>
              <button
                shape="round"
                onClick={handleContactClick}
                className={styles.contactBtn}
              >
                Contact Us{" "}
                <ArrowRightOutlined className={styles.arrowSignOMob} />
              </button>
            </div>
            </div>
          </div>
        </div>
        <div className={styles.inquiryForm}>
          <InquiryForm props={props} />
          <div className={styles.contactDetailsDiv}>
            <div className={styles.contactDetails}>
              <div className={styles.title}>Email</div>
              <div className={styles.desc}>enquiry@theweekenddoor.com</div>
              <div className={styles.title2}>Contact</div>
              <div className={styles.desc}>+91 9988337646</div>
              <div className={styles.desc}>+91 9646867646</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
