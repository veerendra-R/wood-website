import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Select,
  Radio,
  Button,
  Space,
  Row,
  Input,
  Modal,
  FloatButton,
  Carousel,
  Form,
  DatePicker,
  Col,
  Typography,
  Divider,
  Layout,
  Flex,
} from "antd";
import {
  DoubleRightOutlined,
  QuestionCircleOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  InstagramOutlined,
  TwitterOutlined,
  WhatsAppOutlined,
  YoutubeOutlined,
  FacebookOutlined,
  CustomerServiceOutlined,
  ArrowUpOutlined,
} from "@ant-design/icons";
import { firestore } from "../../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  getFirestore,
} from "firebase/firestore";
import styles from "./homepage.module.scss";
import InquiryForm from "../../components/InquiryForm";
import { showNotification } from "../../components/notification";
import { useRouter } from "next/router";
import FooterComponent from "../../components/layout/footer";
import {
  resetLoader,
  setLoader,
} from "../../components/reducers/reduxtoolkit/loaderSlice";
import { useDispatch } from "react-redux";
import moment from "moment";
const { Paragraph, Text } = Typography;
const { Header, Footer, Sider, Content } = Layout;

const { Meta } = Card;
const { Option } = Select;
const { Search } = Input;
const { Title } = Typography;

const baseStyle = {
  width: "100%",
  height: 54,
};

const Home = () => {
  const dispatch = useDispatch();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filterType, setFilterType] = useState("vacation");
  const [inqModalVisible, setInqModalVisible] = useState(false);
  const [secondDropdown, setSecondDropdown] = useState(null);
  const [vacationBhk, setVacationBhk] = useState(null);
  const [occasionType, setOccasionType] = useState(null);
  const [occasionPax, setOccasionPax] = useState(null);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const router = useRouter();
  const isHomePage = router?.pathname === "/" || router.pathname === "/home";
  console.log("isHomePage", isHomePage);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(false);

  // Function to fetch properties from Firestore
  const fetchProperties = async () => {
    try {
      const citiesRef = collection(firestore, "propertyDetails");
      // const citiesRef = collection(firestore, "users");
      const querySnapshot = await getDocs(citiesRef);
      const propertyData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProperties(propertyData);
      setFilteredProperties(propertyData);
    } catch (error) {
      console.error("Error fetching properties: ", error);
    }
  };

  useEffect(() => {
    dispatch(setLoader());
    fetchProperties();
  }, []);

  // Function to handle property type filtering
  const handleFilterChange = (e) => {
    console.log("valuevalue", e);
    setSecondDropdown(null);
    setFilterType(e?.target?.value);
    if (e?.target?.val === "all") {
      setFilteredProperties(properties);
    } else {
      const filtered = properties?.filter(
        (property) => property.propertyType === e?.target?.value
      );
      setFilteredProperties(filtered);
    }
  };
  const handleOccasionTypeChange = (e) => {
    setOccasionType(e?.target?.val);
  };
  const handleBtnClick = () => {
    if (inqModalVisible) {
      setInqModalVisible(false);
    } else if (!inqModalVisible) {
      setInqModalVisible(true);
    }
  };

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

  const handleSecondDropdownChange = (value) => {
    setSecondDropdown(value);
  };

  const BothOptions = [
    { label: "Birthday Celebrations", value: "birthday" },
    { label: "Kids Birthday Party", value: "Kids-Birthday" },
    {
      label: "Family/ Friends Get-Together",
      value: "Family/Friends-GetTogether",
    },
    { label: "Kitty Party", value: "Kitty-Party" },
    { label: "Corporate/ Company Party", value: "Corporate/Company-Party" },
    { label: "Engagement/ Ring Ceremony", value: "Engagement/Ring-Ceremony" },
    { label: "Pre-wedding Celebrations", value: "Pre-wedding-Celebrations" },
    { label: "Anniversary Celebrations", value: "Anniversary-Celebrations" },
    { label: "Bachelorette party", value: "Bachelorette party" },
    { label: "Wedding", value: "Wedding" },
    { label: "Post Wedding Celebrations", value: "Post-Wedding-Celebrations" },
    { label: "Cocktail Party", value: "Cocktail-Party" },
    { label: "Sangeet Ceremony", value: "Sangeet-Ceremony" },
    {
      label: "Pre-wedding Mehendi Ceremony",
      value: "Pre-wedding-Mehendi-Ceremony",
    },
    { label: "Baby Shower", value: "Baby-Shower" },
    { label: "First Birthday Party", value: "First-Birthday-Party" },
    { label: "Class Get-Together", value: "Class-Get-Together" },
    { label: "Farewell", value: "Farewell" },
    { label: "Freshers Party", value: "Freshers Party" },
  ];

  const occationImages = [
    {
      imgSrc: "birthday.png",
      alt: "abc",
      title: "birthday",
      filterValue: "birthday",
    },
    {
      imgSrc: "familgettogether.png",
      alt: "familgettogether.png",
      title: "birtfamilgettogether ",
      filterValue: "Family/Friends-GetTogether",
    },
    {
      imgSrc: "bachelorsparty.png",
      alt: "bachelorsparty.png",
      title: "birtfamilgettogether ",
      filterValue: "Bachelorette party",
    },
    {
      imgSrc: "wedding.png",
      alt: "abc",
      title: "birtwedding",
      filterValue: "Wedding",
    },
    {
      imgSrc: "sangeeth.png",
      alt: "abc",
      title: "bachelorsparty ",
      filterValue: "Post-Wedding-Celebrations",
    },
    {
      imgSrc: "babyshower.png",
      alt: "abc",
      title: "birthday",
      filterValue: "Baby-Shower",
    },
    {
      imgSrc: "aniversary.png",
      alt: "abc",
      title: "bachelorsparty ",
      filterValue: "Anniversary-Celebrations",
    },
    {
      imgSrc: "corporateparty.png",
      alt: "abc",
      title: "birthday",
      filterValue: "Cocktail-Party",
    },
  ];
  const occationOptions = [
    { label: "Birthday Celebrations", value: "birthday" },
    { label: "Kids Birthday Party", value: "Kids-Birthday" },
    {
      label: "Family/ Friends Get-Together",
      value: "Family/Friends-GetTogether",
    },
    { label: "Kitty Party", value: "Kitty-Party" },
    { label: "Corporate/ Company Party", value: "Corporate/Company-Party" },
    { label: "Engagement/ Ring Ceremony", value: "Engagement/Ring-Ceremony" },
    { label: "Pre-wedding Celebrations", value: "Pre-wedding-Celebrations" },
    { label: "Anniversary Celebrations", value: "Anniversary-Celebrations" },
    { label: "Bachelorette party", value: "Bachelorette party" },
    { label: "Wedding", value: "Wedding" },
    { label: "Post Wedding Celebrations", value: "Post-Wedding-Celebrations" },
    { label: "Cocktail Party", value: "Cocktail-Party" },
    { label: "Sangeet Ceremony", value: "Sangeet-Ceremony" },
    {
      label: "Pre-wedding Mehendi Ceremony",
      value: "Pre-wedding-Mehendi-Ceremony",
    },
    { label: "Baby Shower", value: "Baby-Shower" },
    { label: "First Birthday Party", value: "First-Birthday-Party" },
    { label: "Class Get-Together", value: "Class-Get-Together" },
    { label: "Farewell", value: "Farewell" },
    { label: "Freshers Party", value: "Freshers Party" },
  ];


  const occationPaxOptions = [
    { label: "50" ,  value: "25-50"     },
    { label: "100",  value: "50-100"    },
    { label: "150",  value: "100-150"   },
    { label: "200",  value: "150-200"   },
    { label: "250",  value: "200-250"   },
    { label: "300",  value: "250-300"   },
    { label: "350",  value: "300-350"   },
    { label: "400",  value: "350-400"   },
    { label: "450",  value: "400-450"   },
    { label: "500",  value: "450-500"   },
    { label: "550",  value: "500-550"   },
    { label: "600",  value: "550-600"   },
    { label: "650",  value: "600-650"   },
    { label: "700",  value: "650-700"   },
    { label: "750",  value: "700-750"   },
    { label: "800",  value: "750-800"   },
    { label: "850",  value: "800-850"   },
    { label: "900",  value: "850-900"   },
    { label: "950",  value: "900-950"   },
    { label: "1000", value: "950-1000"  },
  ];

  const vacctionBhks = [
    { label: "1BHK", value: "1BHK" },
    { label: "2BHK", value: "2BHK" },
    { label: "3BHK", value: "3BHK" },
    { label: "4BHK", value: "4BHK" },
    { label: "5BHK", value: "5BHK" },
    { label: "6BHK", value: "6BHK" },
  ];
  useEffect(() => {
    // Sort filteredProperties based on updatedAt
    const sortedProperties = filteredProperties
  ?.sort((a, b) => {
    // If a or b does not have an updatedAt field, keep it last
    if (!a.updatedAt) return 1;
    if (!b.updatedAt) return -1;
    // Sort by updatedAt in descending order
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });
  
    // Update the state with the sorted array
    setFilteredProperties(sortedProperties);
  
    console.log("filteredProperties after sorting", sortedProperties);
  }, [filteredProperties]);
  

  // const onFinish = async () => {
  //   dispatch(setLoader());
  //   console.log(
  //     "occasionPax,occasionType,filterType,vacationBhkcheckInDate,checkOutDate",
  //     occasionPax,
  //     occasionType,
  //     filterType,
  //     vacationBhk,
  //     checkInDate,
  //     checkOutDate
  //   );
  //   const db = getFirestore();
  //   let filteredData = [];

  //   const propertiesRef = collection(db, "propertyDetails");
  //   const q =
  //     filterType === "vacation"
  //       ? query(propertiesRef, where("propertyType", "==", "vacation"))
  //       : query(propertiesRef, where("propertyType", "==", "occasion"));

  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     const data = doc.data();
  //     data.id = doc.id;

  //     if (filterType === "vacation") {
  //       const propertyBhk =
  //         typeof data?.bhk === "string" ? data?.bhk.toLowerCase() : null;

  //       if (!vacationBhk || propertyBhk?.includes(vacationBhk?.toLowerCase())) {
  //         filteredData.push(data);
  //       }
  //     } else if (filterType === "occasion") {
  //       const propertyOccasionType = data?.occasionType || [];

  //       const propertyPax = data?.pax || []; // Get the pax array from the data
  //       // Convert string range to numbers
  //       const [minRange, maxRange] = occasionPax
  //         ? occasionPax.split("-").map(Number)
  //         : [];
  //       console.log("propertyPax",propertyPax)
  //       console.log("minRange, maxRange",minRange, maxRange)

  //       // Check if both min and max fall within the range
  //       const isInRange =
  //         propertyPax.length === 2 &&
  //         propertyPax[0] >= minRange &&
  //         propertyPax[1] <= maxRange;


  //       console.log("isInRange",isInRange)
  //       console.log("propertyOccasionType",propertyOccasionType)
  //       if (
  //         !occasionType ||
  //         propertyOccasionType.some((type) =>
  //           type.toLowerCase().includes(occasionType.toLowerCase())
  //         ) ||
  //         isInRange
  //       ) {
  //         filteredData.push(data);
  //       }
  //     } else {
  //       filteredData.push(data); // If no filters applied, include all data
  //     }
  //   });

  //   if (filteredData && filteredData.length > 0) {
  //     console.log("filteredData", filteredData);
  //     setFilteredProperties(filteredData);

  //     if (filteredProperties?.length != 0) {
  //       const queryParams = {
  //         filterFields: {
  //           occasionType: occasionType,
  //           occasionPax: occasionPax,
  //           occasionType: occasionType,
  //           filterType: filterType,
  //           vacationBhk: vacationBhk,
  //           checkInDate: moment(checkOutDate),
  //           checkOutDate: moment(checkOutDate),
  //         },
  //         filteredDataArr: filteredData,
  //       };
  //       const constructQueryParams = (params) => {
  //         const queryParams = new URLSearchParams();

  //         Object.entries(params).forEach(([key, value]) => {
  //           if (typeof value === "object") {
  //             queryParams.append(key, JSON.stringify(value));
  //           } else {
  //             queryParams.append(key, value);
  //           }
  //         });
  //         return queryParams.toString();
  //       };

  //       const queryString = constructQueryParams(queryParams);
  //       router.push(`/properties?${queryString}`);
  //     }
  //   } else {
  //     showNotification(
  //       "No Results Found",
  //       "Sorry, there are no matches for your search. Please adjust your filters and try again.",
  //       "warning"
  //     );
  //     dispatch(resetLoader());
  //   }
  // };


  const onFinish = async () => {
    dispatch(setLoader());
    console.log(
      "occasionPax,occasionType,filterType,vacationBhkcheckInDate,checkOutDate",
      occasionPax,
      occasionType,
      filterType,
      vacationBhk,
      checkInDate,
      checkOutDate
    );
    const db = getFirestore();
    let filteredData = [];
  
    const propertiesRef = collection(db, "propertyDetails");
    const q =
      filterType === "vacation"
        ? query(propertiesRef, where("propertyType", "==", "vacation"))
        : query(propertiesRef, where("propertyType", "==", "occasion"));
  
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
  
      if (filterType === "vacation") {
        // const propertyBhk =
        //   typeof data?.bhk === "string" ? data?.bhk.toLowerCase() : null;
  
        // if (!vacationBhk || propertyBhk?.includes(vacationBhk?.toLowerCase())) {
        //   filteredData.push(data);
        // }
        const propertyBhk = Array.isArray(data?.bhk) ? data?.bhk.map(bhk => bhk.toLowerCase()) : [];
        if (!vacationBhk || propertyBhk.includes(vacationBhk.toLowerCase())) {
          console.log("vacationBhkvacationBhk", vacationBhk);
          filteredData.push(data);
        }
      } else if (filterType === "occasion") {
        // const propertyOccasionType = data?.occasionType || [];
  
        // const propertyPax = data?.pax || []; // Get the pax array from the data
        // // Convert string range to numbers
        // const [minRange, maxRange] = occasionPax
        //   ? occasionPax.split("-").map(Number)
        //   : [];
        // console.log("propertyPax", propertyPax);
        // console.log("minRange, maxRange", minRange, maxRange);
  
        // // Check if both min and max fall within the range
        // const isInRange =
        //   propertyPax.length === 2 &&
        //   propertyPax[0] >= minRange &&
        //   propertyPax[1] <= maxRange;
  
        // console.log("isInRange", isInRange);
        // console.log("propertyOccasionType", propertyOccasionType);
        // if (
        //   !occasionType ||
        //   propertyOccasionType.some((type) =>
        //     type.toLowerCase().includes(occasionType.toLowerCase())
        //   ) ||
        //   isInRange
        // ) {
        //   filteredData.push(data);
        // }
        const propertyOccasionType = Array.isArray(data?.occasionType) ? data?.occasionType.map(type => type.toLowerCase()) : [];
        const propertyPax = Array.isArray(data?.pax) ? data?.pax : [0, 0]; // Assuming default is no pax limit
        const [minPax, maxPax] = propertyPax;
        
        if (
          !Array.isArray(occasionType) || occasionType.length === 0 ||  // Check if occasionType is not an array or empty
          occasionType.some(type => propertyOccasionType.includes(type.toLowerCase())) ||
          !Array.isArray(occasionPax) || occasionPax.length !== 2 ||  // Check if occasionPax is not an array or does not have 2 elements
          (minPax <= occasionPax[0] && maxPax <= occasionPax[1])
        ) {
          filteredData.push(data);
        }
      } else {
        filteredData.push(data); // If no filters applied, include all data
      }
    });
  
    if (filteredData.length > 0) {
      console.log("filteredData", filteredData);
      setFilteredProperties(filteredData);
  
      // If you want to navigate only if there are filtered properties
      const queryParams = {
        filterFields: {
          occasionType: occasionType,
          occasionPax: occasionPax,
          occasionType: occasionType, // This seems redundant, maybe remove one?
          filterType: filterType,
          vacationBhk: vacationBhk,
          checkInDate: moment(checkOutDate),
          checkOutDate: moment(checkOutDate),
        },
        filteredDataArr: filteredData,
      };
      const constructQueryParams = (params) => {
        const queryParams = new URLSearchParams();
  
        Object.entries(params).forEach(([key, value]) => {
          if (typeof value === "object") {
            queryParams.append(key, JSON.stringify(value));
          } else {
            queryParams.append(key, value);
          }
        });
        return queryParams.toString();
      };
  
      const queryString = constructQueryParams(queryParams);
      router.push(`/properties?${queryString}`);
    } else {
      showNotification(
        "No Results Found",
        "Sorry, there are no matches for your search. Please adjust your filters and try again.",
        "warning"
      );
    }
  
    dispatch(resetLoader());
  };
  

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
    console.log("isMobile", isMobile);
  }, [isMobile]);

  const contentStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // height: "100vh",
    color: "#fff",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  const carouselItems = [
    {
      text: "Vacation",
      backgroundImage: "Vacation-1.png",
    },
    {
      text: "Occasion",
      backgroundImage: "Occasion-1.png",
    },
    {
      text: "Vacation",
      backgroundImage: "Vacation-2.png",
    },
    {
      text: "Occasion",
      backgroundImage: "Occasion-2.png",
    },

    {
      text: "Vacation",
      backgroundImage: "Vacation-3.png",
    },
    {
      text: "Occasion",
      backgroundImage: "Occasion-3.png",
    },
    {
      text: "Vacation",
      backgroundImage: "Vacation-4.png",
    },
    {
      text: "Occasion",
      backgroundImage: "Occasion-4.png",
    },
    {
      text: "Vacation",
      backgroundImage: "Vacation-5.png",
    },
    {
      text: "Occasion",
      backgroundImage: "Occasion-5.png",
    },
  ];

  const handleScrollDown = () => {
    const windowHeight = window.innerHeight;
    window.scrollBy({
      top: windowHeight,
      behavior: "smooth",
    });
  };

  const bestProperties = [
    {
      imgSrc:
        "https://t4.ftcdn.net/jpg/00/98/30/93/360_F_98309392_LcMJtLXZMLLa9pdpuzwrY4MiwnihI2QT.jpg",
      alt: "abc",
      title: "Sera Resorts",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
      id: "12",
    },
    {
      imgSrc:
        "https://img.freepik.com/free-photo/luxury-pool-villa-spectacular-contemporary-design-digital-art-real-estate-home-house-property-ge_1258-150762.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703203200&semt=ais",
      alt: "abc",
      title: "Tripura Resorts",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
      id: "13",
    },
    {
      imgSrc:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlsbGF8ZW58MHx8MHx8fDA%3D",
      alt: "abc",
      title: "Sera Resortst",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
      id: "14",
    },
    {
      imgSrc:
        "https://plus.unsplash.com/premium_photo-1682889762731-375a6b22d794?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "abc",
      title: "Europe Street beat",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
      id: "15",
    },
    {
      imgSrc:
        "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmlsbGF8ZW58MHx8MHx8fDA%3D",
      alt: "abc",
      title: "Europe Street beat",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
      id: "16",
    },
    {
      imgSrc:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dmlsbGF8ZW58MHx8MHx8fDA%3D",
      alt: "abc",
      title: "Europe Street beat",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
      id: "17",
    },
    {
      imgSrc:
        "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHZpbGxhfGVufDB8fDB8fHww",
      alt: "abc",
      title: "Europe Street beat",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
      id: "18",
    },
    {
      imgSrc:
        "https://plus.unsplash.com/premium_photo-1678286769514-e60a57a33b73?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "abc",
      title: "Europe Street beat",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
      id: "19",
    },
  ];
  const hydPlaces = [
    {
      imgSrc: "tankBund.png",
      alt: "abc",
      title: "TankBund",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
    },
    {
      imgSrc: "ramoji.png",
      alt: "abc",
      title: "Ramoji Film city",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
    },
    {
      imgSrc: "golconda.png",
      alt: "abc",
      title: "Golconda  Fort",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
    },
    {
      imgSrc: "charminar.png",
      alt: "abc",
      title: "Charminar",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
    },
    {
      imgSrc: "tankBund.png",
      alt: "abc",
      title: "TankBund",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
    },
    {
      imgSrc: "ramoji.png",
      alt: "abc",
      title: "Ramoji Film city",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
    },
    {
      imgSrc: "golconda.png",
      alt: "abc",
      title: "Golconda  Fort",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
    },
    {
      imgSrc: "charminar.png",
      alt: "abc",
      title: "Charminar",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
    },
  ];
  const includeTxt = `{ INCLUDE - NORTH, SOUTH, EAST, WEST OF HYD }`;
  const gridStyle = {
    width: "25%",
    textAlign: "center",
  };

  const handleCardClick = (id) => {
    dispatch(setLoader());
    router.push(`/home/resorts/${id}`);
  };
  const handleCheckinChange = (date) => {
    console.log("handleCheckinChange", moment(date));
    // setCheckInDate(moment(date));
    setCheckInDate(date);
  };

  const handleCheckOutChange = (date) => {
    console.log("handleCheckOutChange", moment(date));
    setCheckOutDate(date);
  };

  useEffect(() => {
    console.log("checkInDate", checkInDate, "checkOutDate", checkOutDate);
  }, [checkOutDate, checkInDate]);

  const disabledDate = (current) => {
    // Disable dates in the past in the checkout datepicker
    return current && current < new Date().setHours(0, 0, 0, 0);
  };

  const containerRef1 = useRef(null);
  const containerRef2 = useRef(null);

  const handleScroll1 = (scrollOffset) => {
    if (containerRef1.current) {
      const container = containerRef1.current;
      const scrollWidth = container.scrollWidth - container.clientWidth;
      const newPosition = container.scrollLeft + scrollOffset;

      container.scrollTo({
        left: Math.max(0, Math.min(newPosition, scrollWidth)),
        behavior: "smooth",
      });
    }
  };

  const handleScroll2 = (scrollOffset) => {
    if (containerRef2.current) {
      const container = containerRef2.current;
      const scrollWidth = container.scrollWidth - container.clientWidth;
      const newPosition = container.scrollLeft + scrollOffset;

      container.scrollTo({
        left: Math.max(0, Math.min(newPosition, scrollWidth)),
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    dispatch(resetLoader());
  }, []);

  const handleImageClick = (filterValue) => {
    const filterObject = { filterValue: filterValue, filterType: "occasion" };
    const stringifiedFilter = encodeURIComponent(JSON.stringify(filterObject));
    console.log("stringifiedFilter", stringifiedFilter);
    router.push(`/properties?filter=${stringifiedFilter}`);
  };

  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedToggle, setSelectedToogle] = useState("vacation");
  const [showVacationInputs, setShowVacationInputs] = useState(false);
  const [showOccasionInputs, setShowOccasionInputs] = useState(false);
  const bestcontainerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) =>
        prevSlide === carouselItems.length - 1 ? 0 : prevSlide + 1
      );
    }, 1800); // Change image every 1 second (half of the text animation duration)

    return () => clearInterval(interval);
  }, [carouselItems]);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  const handleToggle = (value) => {
    setSelectedToogle(value);
    setFilterType(value);
  };

  const handleArrIconClick = () => {
    // Scroll functionality
    // Replace the line below with your specific scroll logic
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  const handleScrollLeft = () => {
    if (bestcontainerRef.current) {
      bestcontainerRef.current.scrollLeft -= 200; // Adjust scroll amount as needed
    }
  };

  const handleScrollRight = () => {
    if (bestcontainerRef.current) {
      bestcontainerRef.current.scrollLeft += 200; // Adjust scroll amount as needed
    }
  };

  const handleViewMoreBtnClick = () => {
    router.push(`/properties`);
  };


  const handlePhoneIconClick=()=>{
    window.location.href = 'tel:+919988337646';
  }

  const handleContactClick = () => {
    router.push("/servicePage");
  };

  return (
    <>
      <div className={styles.videoContainer}>
        <video autoPlay muted loop className={styles.video} preload="auto">
          <source
            src="https://res.cloudinary.com/dution6q9/video/upload/v1706256176/a7avbfqjbixwjwz9uoa0.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>

        <div className={styles.overlay}></div>
        <div className={styles.textContainer}>
          <h1 className={styles.h1Txt}> Hyderabad, open the door to luxury</h1>
          <div className={styles.scrollingWordsContainer}>
            <div className={styles.scrollingWordsBox}>
              <ul>
                <li>Vacations</li>
                <li>Occasions</li>
                <li>Vacations</li>
                <li>Occasions</li>
                <li>Vacations</li>
              </ul>
            </div>
          </div>
          <div className={styles.toggleGroup}>
            <div className={styles.toggleContainer}>
              <button
                className={`${styles.toggleButton} ${
                  selectedToggle === "vacation" ? styles.active : ""
                }`}
                onClick={() => handleToggle("vacation")}
              >
                Vacations
              </button>
              <button
                className={`${styles.toggleButton} ${
                  selectedToggle === "occasion" ? styles.active : ""
                }`}
                onClick={() => handleToggle("occasion")}
              >
                Occasions
              </button>
            </div>
          </div>
          <div
            className={
              filterType === "vacation" ? "filterBtnsRR" : "filterBtns2RR"
            }
          >
            {filterType === "vacation" && (
              <>
                <Flex gap="middle" vertical={isMobile ? true : false}>
                  <Select
                    placeholder={<span className={styles.placeholderTxt}>{"Select BHK"}</span>}
                    className="selectorRR"
                    options={vacctionBhks}
                    onChange={(value) => setVacationBhk(value)}
                  ></Select>
                  <DatePicker
                    placement="bottomLeft"
                    placeholder="Check-In"
                    onChange={handleCheckinChange}
                    className="datePicker1RR"
                    disabledDate={disabledDate}
                  />
                  <DatePicker
                    placement="bottomLeft"
                    placeholder="Check-Out"
                    onChange={handleCheckOutChange}
                    className="datePicker1RR"
                    disabledDate={disabledDate}
                  />
                </Flex>
              </>
            )}

            {filterType === "occasion" && (
              <div className="occBtnsRR">
                <div className="occBtn1RR">
                  <Select
                    className="occSel1RR"
                    placeholder={<span className={styles.placeholderTxt}>{"Select Occasion Type" }</span>}
                    onChange={(value) => setOccasionType(value)}
                    options={occationOptions}
                    value={occasionType}
                  />
                </div>
                <div className="occBtn2RR">
                  <Select
                    className="occSel2RR"
                    placeholder= {<span className={styles.placeholderTxt}>{"Select Pax Range"}</span>}
                    onChange={(value) => setOccasionPax(value)}
                    value={occasionPax}
                    options={occationPaxOptions}
                  />
                </div>
              </div>
            )}

            <div className="submitBtRRn">
              <Button type="primary" onClick={onFinish}>
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.scrollIconMainDiv}>
        <DoubleRightOutlined
          className={styles.scrollIcon}
          style={{ fontSize: "40px", transform: "rotate(90deg)" }}
          onClick={handleArrIconClick}
        />
      </div>
      <div className={styles.cardsContainer}>
        <div className={styles.textSection}>
          <h2 className={styles.mainTitle}>People loved their stay at</h2>
          <p className={styles.descriptionTitle}>
            Find handpicked properties for unforgettable vacations and
            occasions.
          </p>
          {!isMobile && (
            <button
              className={styles.viewMoreButton}
              onClick={handleViewMoreBtnClick}
            >
              VIEW MORE <ArrowRightOutlined className={styles.arrowSignOMob} />
            </button>
          )}
        </div>
        <div className={styles.cardContainer}>
          {filteredProperties?.slice(0, 3).map((card, index) => (
            <div key={index} className={styles.customCard}>
              <img
                src={card?.images?.[0]}
                alt={card?.propertyName}
                className={styles.cardImage}
                onClick={() => handleCardClick(card?.id)}
              />
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{card?.propertyName}</h3>
              </div>
            </div>
          ))}
        </div>
        {isMobile && (
          <button
            className={styles.viewMoreButton}
            onClick={handleViewMoreBtnClick}
          >
            VIEW MORE <ArrowRightOutlined className={styles.arrowSignOMob} />
          </button>
        )}
      </div>
      <Divider />
      <div>
        <h2 className={styles.imageTitle}>Walk into Hyderabad's heart</h2>
        <img
          src="hyd_abt.svg"
          alt="Image description"
          className={styles.image}
        />
        <p className={styles.imageDescription}>
          {" "}
          The heart of celebration beats strong in Hyderabad, where tradition
          and innovation fill the air from the Old City to the new. From
          historical landmarks to picturesque landscapes, delectable cuisine to
          shopping hubs, amusement parks to divine places of worship Hyderabad
          brings an abundance of experiences. With luxury properties located in
          Moinabad, Shamshabad, Gandipet & Medchal, The Weekend Door curates
          one-of-a-kind stays for getaway vacations and grand occasions across
          the city. Whether you seek a relaxing escape this weekend or the venue
          of your dreams for a special occasion, we are opening a door for you.
        </p>

        {/* Your previous card section */}
      </div>

      <div className={styles.bestContainer}>
        <div className={styles.textSection1}>
          <h2 className={styles.mainTitle1}>
            Top spots for luxury vacations in Hyderabad for 2024
          </h2>
          <p className={styles.descriptionTitle1}>
            Discover top-rated luxury villas, resorts and more for your next
            vacation in Hyderabad for 2024.
          </p>
          {/* {!isMobile && (
            <button className={styles.viewMoreButton}>
              VIEW MORE <ArrowRightOutlined className={styles.arrowSignOMob} />
            </button>
          )} */}
        </div>
        <Divider />
        {!isMobile && filteredProperties.filter(property => property?.propertyType === "vacation")?.length > 10 && (
            <div className={styles.scrollButtons}>
              <Button
                className={styles.scrollButton}
                onClick={handleScrollLeft}
                icon={<ArrowLeftOutlined />}
              />
              <Button
                className={styles.scrollButton}
                onClick={handleScrollRight}
                icon={<ArrowRightOutlined />}
              />
            </div>
          )}

      <div className={styles.scrollContainer} ref={bestcontainerRef}>
        <div className={styles.cardContainer2}>
          {filteredProperties
            ?.filter(property => property.propertyType === "vacation")
            .slice(3, 10)
            .map((card, index) => (
              <div key={index} className={styles.customCard}>
                <img
                  src={card?.images?.[0]}
                  alt={card?.propertyName}
                  className={styles.cardImage}
                  onClick={() => handleCardClick(card?.id)}
                />
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{card?.propertyName}</h3>
                </div>
              </div>
            ))}
        </div>
      </div>


        {
          <button
            className={styles.viewMoreButtonBottom}
            onClick={handleViewMoreBtnClick}
          >
            VIEW MORE <ArrowRightOutlined className={styles.arrowSignOMob} />
          </button>
        }

        <Divider />

        <div className={styles.textSection1}>
          <h2 className={styles.mainTitle1}>
            Top luxury spots for occasions in Hyderabad.
          </h2>
          <p className={styles.descriptionTitle1}>
            From birthday bashes to grand weddings, bachelor parties to
            unforgettable sangeet ceremonies and beyond, find Hyderabad's best
            venues that suit all occasions.
          </p>
        </div>
        <div className={styles.occationContaner}>
          <Row xs={2} md={4} gutter={!isMobile ? [16, 24] : [20, 20]}>
            {occationImages?.map((bestProperty) => (
              <Col span={isMobile ? 12 : 6}>
                <img
                  alt={bestProperty?.alt}
                  className={styles.occTypes}
                  src={bestProperty?.imgSrc}
                  onClick={() => handleImageClick(bestProperty?.filterValue)}
                />
              </Col>
            ))}
          </Row>
        </div>
        {
          <button
            className={styles.viewMoreButtonBottom}
            onClick={handleViewMoreBtnClick}
          >
            VIEW MORE
            <ArrowRightOutlined className={styles.arrowSignOMob} />
          </button>
        }
      </div>
      {/* <Divider /> */}
      <div className={styles.imageContainer3}>
        <div className={styles.imageOverlay}>
          <h5 className={styles.joinstitle1}>Partner With us!</h5>
          <h2 className={styles.joinstitle}>Make your property<br/> Hyderabad's go-to destination!</h2>
          <h6 className={styles.joinstitle3}>We are more than a booking site. <br/>
            We are marketing partners for property owners and service providers.</h6>
          <button className={styles.button} onClick={handleContactClick}>Join Us!</button>
        </div>
      </div>


      <div className={styles.bestContainer}>
          {""}
      </div>

      {/* <div className={styles.bestContainer}>
        <div className={styles.textSection1}>
          <h2 className={styles.mainTitle1}>
            People who vacationed in Hyderabad also visited
          </h2>
        </div>
        {!isMobile && (
          <div className={styles.scrollButtons}>
            <Button
              className={styles.scrollButton}
              onClick={handleScrollLeft}
              icon={<ArrowLeftOutlined />}
            />
            <Button
              className={styles.scrollButton}
              onClick={handleScrollRight}
              icon={<ArrowRightOutlined />}
            />
          </div>
        )}
        <div className={styles.scrollContainer} ref={bestcontainerRef}>
          <div className={styles.cardContainer2}>
            {hydPlaces?.slice(3, 10).map((card, index) => (
              <div key={index} className={styles.customCard}>
                <img
                  src={card.imgSrc}
                  alt={card.title}
                  className={styles.cardImage}
                />
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Divider />
      </div> */}

      {/* <div className={styles.footerImage}>
        <div className={styles.titleTxt4}>
          VACATIONS & OCCASIONS
          <br />
          <div className={styles.descTxt4}>
            OPEN THE DOOR TO ENDLESS CELEBRATIONS
          </div>
        </div>
      </div> */}
      <Modal
        visible={inqModalVisible}
        onCancel={handleModalChange}
        footer={null}
        centered
        width={500}
      >
        <InquiryForm
          handleModalChangeFromform={handleModalChangeFromform}
          fromHomePage={true}
        />
      </Modal>
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
          {isMobile && <FloatButton
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

export default Home;
