import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../firebase"; // Adjust the path to your firebase config
import { useRouter } from "next/router";
import {
  Button,
  Image,
  Typography,
  Tag,
  Tabs,
  Modal,
  FloatButton,
  Divider,
  Col,
} from "antd";
import {
  LeftOutlined,
  RightOutlined,
  PhoneOutlined,
  InstagramOutlined,
  TwitterOutlined,
  ArrowRightOutlined,
  YoutubeOutlined,
  FacebookOutlined,
  QuestionCircleOutlined,
  HomeOutlined,
  WhatsAppOutlined,
  MailOutlined
} from "@ant-design/icons";
// import styles from "./propertySingle.module.scss";
import styles from "./singleprop.module.scss";

import InquiryForm from "../../../components/InquiryForm";
import FooterComponent from "../../../components/layout/footer";
import { useDispatch } from "react-redux";
import {
  setLoader,
  resetLoader,
} from "../../../components/reducers/reduxtoolkit/loaderSlice";
import moment from "moment";
import styles11 from "./carousal.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';

const { TabPane } = Tabs;

const ClickToView = ({ onClick }) => (
  <div
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      color: "white",
      backgroundColor: "rgba(0, 0, 0, 0.6)",
      padding: "10px",
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    Click to View
  </div>
);

const PropertyPage = () => {
  const dispatch = useDispatch();
  const [property, setProperty] = useState(null);
  const { Paragraph, Text } = Typography;

  const router = useRouter();
  const { propertyId } = router.query;
  console.log("propertyId", propertyId);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);
  const [inqModalVisible, setInqModalVisible] = useState(false);

  useEffect(() => {
    dispatch(setLoader());
    const getPropertyById = async (propertyId) => {
      try {
        const propertyRef = doc(firestore, "propertyDetails", propertyId); // Replace 'users' with your collection name
        const docSnap = await getDoc(propertyRef);

        if (docSnap.exists()) {
          setProperty({ id: docSnap.id, ...docSnap.data() });
          console.log("docSnap", docSnap.data());
          dispatch(resetLoader());
        } else {
          console.log("Property not found");
          dispatch(resetLoader());
        }
      } catch (error) {
        dispatch(resetLoader());
        console.error("Error fetching property:", error);
      }
    };

    // const propertyId = 'YOUR_PROPERTY_ID_HERE'; // Replace with the actual property ID
    if (propertyId) {
      getPropertyById(propertyId);
    }
  }, [propertyId]); // Empty dependency array to fetch data once on component mount

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setIsMobile(windowWidth <= 500); // Set isMobile based on window width
  }, [windowWidth]);

  useEffect(() => {
    if (property) {
      console.log("property", property);
    }
    dispatch(resetLoader());
  }, [property]);

  const handleModalChange = () => {
    if (inqModalVisible) {
      setInqModalVisible(false);
    } else if (!inqModalVisible) {
      setInqModalVisible(true);
    }
  };
  const handleModalChangeFromform = () => {
    setInqModalVisible(false);
  };
  const handleBtnClick = () => {
    if (inqModalVisible) {
      setInqModalVisible(false);
    } else if (!inqModalVisible) {
      setInqModalVisible(true);
    }
  };

  // const propertyDetails = {
  //   imgSrc: [
  //     "https://plus.unsplash.com/premium_photo-1682889762731-375a6b22d794?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //     "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmlsbGF8ZW58MHx8MHx8fDA%3D",
  //     "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dmlsbGF8ZW58MHx8MHx8fDA%3D",
  //     "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHZpbGxhfGVufDB8fDB8fHww",
  //   ],
  //   alt: "Property Images",
  //   title: "Beautiful Villa in the Countryside",
  //   propertyPageLink: "https://www.propertylink.com",
  //   description:
  //     "This stunning villa offers breathtaking views and luxurious amenities...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum...",
  //   checkInTime: "3:00 PM",
  //   checkOutTime: "11:00 AM",
  //   locationURL: "https://maps.google.com/property-location",
  //   socialMediaLinks: {
  //     instagram: "https://www.instagram.com/property_insta",
  //     facebook: "https://www.facebook.com/property_fb",
  //     twitter: "https://www.twitter.com/property_twitter",
  //     youtube: "https://www.youtube.com/property_twitter",
  //   },
  //   amenities: [
  //     "Swimming Pool",
  //     "Spa & Wellness Center",
  //     "Tennis Court",
  //     "Gym",
  //     "Free Wi-Fi",
  //     "Air Conditioning",
  //   ],
  //   houseRules: [
  //     "Valid photo ID required for guests above 18.",
  //     "Guests without valid ID won't be allowed to check in; booking will be cancelled without refund.",
  //     "Due amount (5000 INR) as security deposit must be paid before check-in. Refundable upon property inspection during checkout.",
  //     "Apply for liquor license if party has over 4 liters of liquor; avoid loud music after 11 PM.",
  //     "No illegal acts on premises, including drugs, weapons, gambling. Management may involve authorities.",
  //     "Property not responsible for government inspections due to violation of rules.",
  //     "No smoking indoors; use outdoor areas only. Fines for smoking indoors.",
  //     "Inform management for bonfire arrangements (₹1000 charge for 2 hours).",
  //     "Property not liable for theft, damage, or loss of personal belongings.",
  //     "No lifeguard on duty at the pool; adult supervision required for children.",
  //   ],
  //   startingPrice: { guests: 15, price: 25000 },
  //   id: "15",
  // };

  const propertyDetails = {
    id: "K5mutfjwPE1PKVwOZKT1",
    Threads: "mountainblissretreat.com/community/forum",
    checkOut: {
      seconds: 1703968200,
      nanoseconds: 0,
    },
    amenities: [
      "Private hiking trails",
      "Hot tub with mountain views",
      "Fully stocked bar",
      "Fireplace lounge",
      "High-speed internet",
    ],
    email: "agency3@yopmail.com",
    houseRules: [
      "No smoking indoors",
      "Maximum occupancy: 6 guests",
      "Pets allowed upon request",
      "Quiet hours from 10 PM to 8 AM",
      "Recycling and waste separation required",
    ],
    images: [
      "https://firebasestorage.googleapis.com/v0/b/fir-resort-97242.appspot.com/o/propertyImages%2FK5mutfjwPE1PKVwOZKT1%2F2.jpg?alt=media&token=a0ecbc32-15fe-44ac-ae08-9015c3779aee",
      "https://firebasestorage.googleapis.com/v0/b/fir-resort-97242.appspot.com/o/propertyImages%2FK5mutfjwPE1PKVwOZKT1%2F1.jpg?alt=media&token=a845faf6-d7a5-438d-aef2-3937587788a7",
    ],
    pax: null,
    propertyName: " Luxury Chalet",
    checkIn: {
      seconds: 1703968200,
      nanoseconds: 0,
    },
    propertyType: "vacation",
    twitter: " twitter.com/mountainbliss",
    fblink: "facebook.com/mountainblissretreat",
    youtubeLink: "youtube.com/c/mountainblissretreat",
    bhk: "1BHK",
    instagramLink: "instagram.com/mountainblissretreat",
    occasionType: null,
    description:
      " Nestled amidst picturesque landscapes, this chalet offers unparalleled tranquility and luxury, perfect for nature enthusiasts and those seeking a serene escape.",
    mobileNumber: "+1 (555) 123-4567",
  };

  // const {
  //   images,
  //   alt,
  //   title,
  //   description,
  //   checkInTime,
  //   checkOutTime,
  //   locationURL,
  //   socialMediaLinks,
  //   amenities,
  //   houseRules,
  //   startingPrice,
  //   id,
  // } = property;

  const [formattedCheckiInTime, setFormattedCheckiInTime] = useState(null);
  const [formattedCheckiOutTime, setFormattedCheckiOutTime] = useState(null);

  useEffect(() => {
    if (property?.checkIn && property?.checkOut) {
      const millisecondsCheckIn =
        property?.checkIn?.seconds * 1000 +
        property?.checkIn?.nanoseconds / 1000000;
      const millisecondsCheckout =
        property?.checkOut?.seconds * 1000 +
        property?.checkOut?.nanoseconds / 1000000;

      // Create a Moment object from milliseconds
      const timeMomentCI = moment(millisecondsCheckIn);
      const timeMomentCO = moment(millisecondsCheckout);
      const formatCheckiInTime = timeMomentCI.format("HH:mm");
      const formatCheckiOutTime = timeMomentCO.format("HH:mm");
      console.log("formatCheckiOutTime",formatCheckiInTime,formatCheckiOutTime,)
      setFormattedCheckiInTime(formatCheckiInTime);
      setFormattedCheckiOutTime(formatCheckiOutTime);
    }
  }, [property]);

  // Format the time in a 4-hour format (e.g., HH:mm)
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === property?.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? property?.images.length - 1 : prevIndex - 1
    );
  };

  console.log("millisecondsCheckIn", property);

  function formatTime(time) {
    const [hour, minute] = time?.split(":");
    const formattedHour = parseInt(hour, 10) % 12 || 12;
    const period = parseInt(hour, 10) < 12 ? "AM" : "PM";
    return `${formattedHour}:${minute} ${period}`;
  }


  const handlePhoneIconClick=()=>{
    window.location.href = 'tel:+919988337646';
  }




  return (
    <>
      {/* <div className={styles.carouselContainer}>
        <img
          src={property?.images[currentImageIndex]}
          alt={`Property ${currentImageIndex + 1}`}
          className={styles.carouselImage}
        />
        <div className={styles.propertyDetails}>
          <h2>{property?.propertyName}</h2>
          <p>{property?.bhk}</p>
        </div>
        <div className={styles.navigationButtons}>
          <LeftOutlined onClick={handlePrev} />
          <RightOutlined onClick={handleNext} />
        </div>
      </div> */}
      {/* <div className={styles.carouselContainer}>
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          onSlideChange={(swiper) => {
            console.log("Slide changed to: ", swiper.activeIndex);
          }}
          onSwiper={(swiper) => {
            console.log(swiper);
          }}
        >
          {property?.images.map((image, index) => (
            <SwiperSlide key={`slide_${index}`}>
              <div className={styles11.slideContent}>
                <img
                  src={image}
                  alt={`Property ${index + 1}`}
                  className={styles.carouselImage}
                />
              </div>
              <div className={styles.propertyDetails}>
                  <h2>{property?.propertyName}</h2>
                  <p>{property?.subTitle}</p>
                </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}

      <div className={styles.carouselContainer}>
        <div className={styles.carouselWrapper}>
          <Swiper
            spaceBetween={0}
            slidesPerView={1}
            navigation={true}
            modules={[Navigation]}
          >
            {property?.images.map((image, index) => (
              <SwiperSlide key={`slide_${index}`}>
                <div className={styles11.slideContent}>
                  <img
                    src={image}
                    alt={`Property ${index + 1}`}
                    className={styles.carouselImage}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={styles.propertyDetails}>
            <h2>{property?.propertyName}</h2>
            <p>{property?.subTitle}</p>
          </div>
        </div>
      </div>

      <Divider className={styles.customDivider} />
      <div className={styles.propertyDescriptionSecection1}>
        <div className={styles.aboutPropertySection}>
          <span className={styles.titleTxt2}>About Property</span>
          <Paragraph className={styles.descTxt}>
            {/* {property?.description}{" "} */}
            <div dangerouslySetInnerHTML={{ __html: property?.description }} />
          </Paragraph>
          <Divider className={styles.customDivider} />
          <span className={styles.titleTxt3}>What's Included</span>
          <div className={styles.amenitiesTags}>
            {property?.amenities?.map((amenity, index) => (
              <Tag
                key={index}
                className="propertyTag"
                style={{ fontSize: "18px" }}
              >
                {amenity}
              </Tag>
            ))}
          </div>
          {property?.occasionType?.length != null && (
            <>
              <span className={styles.titleTxt3}>Occasions to Celebrate</span>
              <div className={styles.amenitiesTags}>
                {property?.occasionType?.map((occasion, index) => (
                  <Tag
                    key={index}
                    className="propertyTag"
                    style={{ fontSize: "18px" }}
                  >
                    {occasion}
                  </Tag>
                ))}
              </div>
            </>
          )}
          <Divider className={styles.customDivider} />
          <span className={styles.titleTxt3}>House Rules</span>
          <div className={styles.houseRules}>
            {property?.houseRules?.map((amenity, index) => (
              <Tag
                key={index}
                className="propertyTag"
                style={{ fontSize: "18px" }}
              >
                {amenity}
              </Tag>
            ))}
          </div>
          {property?.propertyType != "occasion" && (
            <>
              <Divider className={styles.customDivider} />
              <span className={styles.titleTxt3}>Timings</span>
              <div className={styles.timings}>
                <span className={styles.checkinTimeTxt}>Check-In:</span>
                <span className={styles.timeTxt}>
                  {formattedCheckiInTime
                    ? formatTime(formattedCheckiInTime)
                    : null}
                </span>
                <span className={styles.checkinTimeTxt}>Check-Out:</span>
                <span className={styles.timeTxt}>
                  {formattedCheckiOutTime
                    ? formatTime(formattedCheckiOutTime)
                    : null}
                </span>
              </div>
            </>
          )}
          {/* <div className={styles.timings}>
          </div> */}
          <Divider className={styles.customDivider} />
          <span className={styles.titleTxt3}>Location</span>
          <div className={styles.locationImg}>
            <div className={styles.locationTxt}>
              <a
                href={property?.locationURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                Click to open Maps
              </a>
            </div>
          </div>
          <Divider className={styles.customDivider} />
          <span className={styles.titleTxt3}>Property Socials</span>
          <div className={styles.abtPropfootersocialIcons}>
            {property?.instagramLink && (
              <a
                href={property?.instagramLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramOutlined className="socialIocns" />{" "}
              </a>
            )}
            {property?.youtubeLink && (
              <a
                href={property?.youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <YoutubeOutlined className="socialIocns" />{" "}
              </a>
            )}
            {property?.fblink && (
              <a
                href={property?.fblink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookOutlined className="socialIocns" />{" "}
              </a>
            )}
            {property?.twitter && (
              <a
                href={property?.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <TwitterOutlined className="socialIocns" />{" "}
              </a>
            )}
          </div>
        </div>

        {/* {!isMobile && ( */}
          {(
          <div className={styles.enquieryForm}>
            <div className={styles.priceDetails}>
              <div className={styles.price2}>
                <span className={styles.priceTitle}>Starts from </span>
                <span className={styles.priceTag}>
                  ₹{property?.price?.toLocaleString()}{" "}
                </span>
              </div>
              <div className={styles.price3}>
                <span className={styles.taxTxt}>(Excl. Taxes)</span>
                <span className={styles.guetTxt}>
                  {"  "}Up to {property?.guests ? property?.guests : property?.pax?.[1]}{" "}
                  Guests
                </span>
              </div>
            </div>
            <InquiryForm />
          </div>
        )}
      </div>
      <Modal
        visible={inqModalVisible}
        onCancel={handleModalChange}
        footer={null}
        centered
        width={800}
      >
        <div className={styles.enquieryForm}>
          {/* <div className={styles.priceDetails}>
              <div className={styles.price2}>
                <span className={styles.priceTitle}>Starts from </span>
                <span className={styles.priceTag}>
                  ₹{property?.price?.toLocaleString()}{" "}
                </span>
              </div>
              <div className={styles.price3}>
                <span className={styles.taxTxt}>(Excl. Taxes)</span>
                <span className={styles.guetTxt}>
                  for {property?.guests} Guests
                </span>
              </div>
            </div> */}
          <InquiryForm handleModalChangeFromform={handleModalChangeFromform} />
        </div>
      </Modal>
      {/* <div className="float">
        <FloatButton
          icon={<QuestionCircleOutlined />}
          type="primary"
          size="larger"
          onClick={handleBtnClick}
        />
      </div> */}

      <div className="float">
        {/* <FloatButton
          icon={<QuestionCircleOutlined className="questionIcon" />}
          size="large"
          onClick={handleBtnClick}
        /> */}
        <FloatButton.Group
          shape="circle"
          // trigger="click"
          style={{
            right: 20,
            // top:' 80%'
          }}
          icon={<QuestionCircleOutlined />}
        >
          { isMobile && <FloatButton
            icon={<PhoneOutlined className="questionIcon" />}
            onClick={handlePhoneIconClick}
            size="large"
          />}
          <FloatButton
            icon={<WhatsAppOutlined className="questionIcon" />}
            href={"https://wa.me/+919988337646"}
            size="large"
          />
          <FloatButton
            icon={<MailOutlined className="questionIcon" />}
            size="large"
            onClick={handleBtnClick}
          />
        </FloatButton.Group>
      </div>
    </>
  );
};

export default PropertyPage;
