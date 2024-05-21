import React from "react";
import styles1 from "../properties/properties.module.scss";
import styles from "./aboutstyles.module.scss";

import {
  Button,
  Image,
  Typography,
  Tag,
  Tabs,
  Modal,
  FloatButton,
  Divider,
} from "antd";
import FooterComponent from "../../components/layout/footer";
import {
  resetLoader,
  setLoader,
} from "../../components/reducers/reduxtoolkit/loaderSlice";
import { useDispatch } from "react-redux";
const { Paragraph, Text } = Typography;
const about = () => {
  const dispatch = useDispatch();

  const description1 = `The Weekend Door (TWD) originates from the 'City of Pearls' - Hyderabad, curating an exquisite line-up of luxury vacation properties spread across the city, embracing every corner from the North, South, East, and West of Hyderabad.`;

  const description2 = `TWD aggregates places for outdoor occasions, so you can bundle up a lifetime of memories with the people you love most.`;

  const description3 = `At TWD, we combine the idea of 'vacations' and 'occasions', because together they make a cause for celebrations.`;

  const description4 = `Established in October 2022, The Weekend Door was born from a desire to help the lively urbanites of Hyderabad discover their ideal retreat for staycations, playcations, parties, family functions, wedding destinations and beyond.`;

  const description5 = `As the brainchild of a Hyderabad-based veterinary realtor's progeny, The Weekend Door was created with a heart to provide unique experiences and a luxurious escape from routine life and to evoke celebrations in every vacation and occasion.`;

  const vdescription1 = `At The Weekend Door, we commit to turning your getaways into unforgettable celebrations. Whether it's a tranquil vacation, a lively occasion, or a grand celebration, we've got the perfect backdrop for every moment of your life. We are not just about creating the cosiest stay or accommodating you in a resort. We ensure an unforgettable experience of luxury that etches itself into your memories.`;

  const vdescription2 = `At the heart of our mission is the belief that luxury is not just a short-lived destination, but an immersive journey. We aim to redefine luxury by giving unique experiences at each property, from farm villas, resorts and more. We are dedicated to curating a collection of properties that stand as individual masterpieces, each offering a unique narrative of indulgence.`;

  const vdescription3 = `Our vision extends beyond being a choice; we aim to be the very essence of vacations and occasions in the celebration of life's precious moments for every Hyderabadi. By always striving for unforgettable hospitality and putting our hearts into it, we aim to not just be known but to be the first thing that comes to mind when people think about enjoying a memorable, luxurious vacation in Hyderabad.`;

  return (
    <>
      {/* <div className="aboutMain">
        <div className={styles1.aboutImage}>
          <div className={styles1.titleTxt4}>
            ABOUT US
            <br />
          </div>
        </div>
      </div> */}
    <div class="aboutMain">
      <div class="titleTxt4">
        ABOUT US
      </div>
      <p class="tagline">Know more about us</p>
    </div>
      <div className="aboutUsPageMain">
        <Divider
          orientation="left"
          orientationMargin="0"
          className={styles.dividerLeft}
        >
          <span className={styles.titleTxt2}>The Rise of TWD</span>
        </Divider>
        <div className={styles.mainDesDiv}>
          <Paragraph className={styles.descTxt}>{description1} </Paragraph>
          <Paragraph className={styles.descTxt}>{description2} </Paragraph>
          <Paragraph className={styles.descTxt}>{description3} </Paragraph>
          <Paragraph className={styles.descTxt}>{description4} </Paragraph>
          <Paragraph className={styles.descTxt}>{description5} </Paragraph>
        </div>
        <Divider className={styles.mainDivider} />
        <div className={styles.valueCards}>
          <div className={styles.valueCard1}>
            <img src={"Promise.png"} className={styles.vcicon} />
            <div className={styles.vctitle}>Our Promise</div>
            <p className={styles.vcDesc}>{vdescription1} </p>
          </div>

          <div className={styles.valueCard1}>
            <img src={"Mission.png"} className={styles.vcicon} />
            <div className={styles.vctitle}>Our Mission</div>
            <p className={styles.vcDesc}>{vdescription2} </p>
          </div>

          <div className={styles.valueCard1}>
            <img src={"Vision.png"} className={styles.vcicon} />
            <div className={styles.vctitle}>Our Vision</div>
            <p className={styles.vcDesc}>{vdescription3} </p>
          </div>
        </div>
        <Divider className={styles.mainDivider} />
        <Divider
          orientation="left"
          orientationMargin="0"
          className={styles.dividerLeft}
        >
          <span className={styles.titleTxt2}>We Value</span>
        </Divider>

        <div className={styles.table}>
          <div className={`${styles.row}`}>
            <div className={`${styles.cell} ${styles.title}`}>
              Women empower excellence
            </div>
            <div className={`${styles.cell} ${styles.description}`}>
              We honour the value that women in our workplace play in shaping
              the present and future of The Weekend Door.{" "}
            </div>
          </div>
          <div className={`${styles.row}`}>
            <div className={`${styles.cell} ${styles.title}`}>
              Distributed boots on the ground
            </div>
            <div className={`${styles.cell} ${styles.description}`}>
              We are a distributed team with more than 70% operating remotely.
              But our dedication makes it feel like we are Light there on the
              front lines, putting in the hard work day in and day out. .{" "}
            </div>
          </div>
          <div className={`${styles.row}`}>
            <div className={`${styles.cell} ${styles.title}`}>
              Celebration of cultural diversity
            </div>
            <div className={`${styles.cell} ${styles.description}`}>
              We believe that embracing different perspectives and cultures
              enhances our creativity and strengthens our connection with the
              city we call home. .{" "}
            </div>
          </div>
          <div className={`${styles.row}`}>
            <div className={`${styles.cell} ${styles.title}`}>
              Women empower excellence
            </div>
            <div className={`${styles.cell} ${styles.description}`}>
              We honour the value that women in our workplace play in shaping
              the present and future of The Weekend Door.{" "}
            </div>
          </div>
          <div className={`${styles.row}`}>
            <div className={`${styles.cell} ${styles.title}`}>
              Customer-focused hospitality
            </div>
            <div className={`${styles.cell} ${styles.description}`}>
              Hospitality is not just a service; it's a commitment. We
              prioritize our guests' comfort, satisfaction, and well-being,
              ensuring that every stay with The Weekend Door is a memorable
              experience.{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default about;
