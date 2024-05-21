import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase";
import { useRouter } from "next/router";
import dayjs from "dayjs";
// import styles from "./properties.module.scss";
import styles from "./prop.module.scss";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  QuestionCircleOutlined,
  MailOutlined,
  PhoneOutlined,
  WhatsAppOutlined
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Button,
  theme,
  Card,
  Radio,
  Select,
  Space,
  TimePicker,
  Row,
  Affix,
  Col,
  DatePicker,
  FloatButton,
  Modal,
  Pagination
} from "antd";
import FooterComponent from "../../components/layout/footer";
import {
  collection,
  getDocs,
  query,
  where,
  getFirestore,
} from "firebase/firestore";
import {
  resetLoader,
  setLoader,
} from "../../components/reducers/reduxtoolkit/loaderSlice";
import { useDispatch } from "react-redux";
import moment from "moment";
import { showNotification } from "../../components/notification";
import InquiryForm from "../../components/InquiryForm";

const { Header, Content, Footer, Sider } = Layout;

const { Meta } = Card;
const { Option } = Select;

const PropertyList = () => {
  const dispatch = useDispatch();

  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [queryParamsRecivedFromHome, setQueryParamsRecivedFromHome] =
    useState(null);
  const [flagTotriggerFetchFromHomePage, setFlagTotriggerFetchFromHomePage] =
    useState(true);
  const today = moment();
  const [filterType, setFilterType] = useState("occasion");
  const [defaultFilter,setDefaultFilter]= useState(true)
  const [checkIntTime, setCheckIntTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [occasionType, setOccasionType] = useState("");
  const [occasionPax, setoccasionPax] = useState();
  const [vacationBhk, setvacationBhk] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [inqModalVisible, setInqModalVisible] = useState(false);

  const router = useRouter();



  useEffect(() => {
    const getQueryParams = () => {
      const queryParams = router.query;
      const parsedQuery = { ...queryParams };
  
      // Parse JSON strings in query params
      try {
        if (queryParams?.filterFields) {
          parsedQuery.filterFields = JSON.parse(queryParams.filterFields);
        }
        if (queryParams?.filteredDataArr) {
          parsedQuery.filteredDataArr = JSON.parse(queryParams.filteredDataArr);
        }
      } catch (error) {
        // Handle parsing errors if necessary
        console.error("Error parsing JSON:", error);
      }
  
      return parsedQuery;
    };
  
    const queryParams = getQueryParams();
    console.log("queryParams", queryParams);
    const imageFilterFromHome = queryParams?.filter
      ? JSON.parse(queryParams?.filter)
      : null;
    console.log("imageFilterFromHome", imageFilterFromHome);

    setQueryParamsRecivedFromHome(queryParams);
  
    if (
      queryParams?.filterFields?.filterType ||
      imageFilterFromHome?.filterType
    ) {
      setFilterType(
        queryParams?.filterFields?.filterType || imageFilterFromHome?.filterType
      );
      setDefaultFilter(false)
    }
    if (queryParams?.filterFields?.occasionType) {
      setOccasionType(queryParams?.filterFields?.occasionType);
    }
    if (queryParams?.filterFields?.vacationBhk) {
      console.log("setting the vacationBhk")
      setvacationBhk(queryParams?.filterFields?.vacationBhk);
      setDefaultFilter(false)
    }
    if (queryParams?.filteredDataArr) {
      setFilteredProperties(queryParams?.filteredDataArr);
      setDefaultFilter(false)
    }
    if (queryParams?.filterFields?.occasionPax) {
      console.log("setting the occassion pax")
      setoccasionPax(queryParams?.filterFields?.occasionPax);
      setDefaultFilter(false)
    }
    if (queryParams?.filterFields?.checkInDate) {
      console.log("setting the vacationBhk")
      const dateString = queryParams?.filterFields?.checkInDate;
      const momentObject = moment(dateString);
      setCheckIntTime(momentObject?._i);
      setDefaultFilter(false)
    }
  
    if (queryParams?.filterFields?.checkOutDate) {
      console.log("setting the vacationBhk")
      const dateString = queryParams?.filterFields?.checkOutDate;
      const momentObject = moment(dateString);
      setCheckOutTime(momentObject?._i);
      setDefaultFilter(false)
    }
  
    if (imageFilterFromHome?.filterValue) {
      setOccasionType(imageFilterFromHome?.filterValue);
      setDefaultFilter(false)
    }
  }, [router.query,defaultFilter]);
    
  // Function to fetch properties from Firestore
  const fetchProperties = async () => {
    try {
      const citiesRef = collection(firestore, "propertyDetails");
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
    if (queryParamsRecivedFromHome == null && !flagTotriggerFetchFromHomePage) {
      fetchProperties();
    }
  }, []);
  
  // Filter properties based on search criteria
  const filterProperties = () => {
    dispatch(setLoader());
    const filteredData = properties?.filter((data) => {
      if (filterType === "vacation") {
        const propertyBhk = typeof data?.bhk === "string" ? data?.bhk.toLowerCase() : null;
        return !vacationBhk || propertyBhk?.includes(vacationBhk?.toLowerCase());
      } else if (filterType === "occasion") {
        const propertyOccasionType = data?.occasionType || [];
        const propertyPax = data?.pax || [];
  
        // Convert string range to numbers
        const [minRange, maxRange] = occasionPax
          ? occasionPax.split("-").map(Number)
          : [];
        
        
  
        // Check if both min and max fall within the range
        const isInRange =
          propertyPax.length === 2 &&
          propertyPax[0] >= minRange &&
          propertyPax[1] <= maxRange;
  
        return (
          !occasionType ||
          propertyOccasionType.some((type) =>
            type.toLowerCase().includes(occasionType.toLowerCase())
          ) ||
          isInRange
        );
      } else {
        return true; // Include all data if no filters applied
      }
    });
  
    if (filteredData && filteredProperties?.length != 0) {
      dispatch(resetLoader())
      console.log("Filtered Data:", filteredData);
      setFilteredProperties(filteredData);
    } else if(filteredProperties?.length === 0) {
      dispatch(resetLoader())
      showNotification(
        "No Results Found",
        "Sorry, there are no matches for your search. Please adjust your filters and try again.",
        "warning"
      );
    }
  };
  
  useEffect(() => {
    console.log("occasionPax",occasionPax)
    if (properties?.length > 0) {
      setoccasionPax(occasionPax)
      filterProperties();
    }
  }, [properties, filterType, occasionType, vacationBhk, occasionPax]);
  

  useEffect(()=>{
    console.log("filterTypefilterType",filterType)
    console.log("insid the use effect defaultFilter",defaultFilter)
   
    if(filterType=="occasion" && defaultFilter){
      console.log("defaultFilter",defaultFilter)
      setvacationBhk(null)
      setCheckIntTime(null)
      setCheckOutTime(null)
      onFinish()
    }
    if(filterType== "vacation" && defaultFilter ){
      console.log("setting the values")
      setOccasionType(null)
      setoccasionPax(null)
      onFinish()
    }
  },[defaultFilter,filterType])


  
  const handleOccasionTypeChange = (value) => {
    setOccasionType(value);
  };

  // Function to handle property type filtering
  const onChangeofFilter = (value) => {
    setFilterType(value);
  };

  const optionsWithDisabled = [
    {
      label: "Vacations",
      value: "vacation",
    },
    {
      label: "Occasions",
      value: "occasion",
    },
  ];

  const bestProperties = [
    {
      imgSrc:
        "https://t4.ftcdn.net/jpg/00/98/30/93/360_F_98309392_LcMJtLXZMLLa9pdpuzwrY4MiwnihI2QT.jpg",
      alt: "abc",
      propertyName: "Europe Street beat",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
      id: "12",
    },
    {
      imgSrc:
        "https://img.freepik.com/free-photo/luxury-pool-villa-spectacular-contemporary-design-digital-art-real-estate-home-house-property-ge_1258-150762.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703203200&semt=ais",
      alt: "abc",
      propertyName: "Europe Street beat",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
      id: "13",
    },
    {
      imgSrc:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlsbGF8ZW58MHx8MHx8fDA%3D",
      alt: "abc",
      propertyName: "Europe Street beat",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
      id: "14",
    },
    {
      imgSrc:
        "https://plus.unsplash.com/premium_photo-1682889762731-375a6b22d794?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "abc",
      propertyName: "Europe Street beat",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
      id: "15",
    },
    {
      imgSrc:
        "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmlsbGF8ZW58MHx8MHx8fDA%3D",
      alt: "abc",
      propertyName: "Europe Street beat",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
      id: "16",
    },
    {
      imgSrc:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dmlsbGF8ZW58MHx8MHx8fDA%3D",
      alt: "abc",
      propertyName: "Europe Street beat",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
      id: "17",
    },
    {
      imgSrc:
        "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHZpbGxhfGVufDB8fDB8fHww",
      alt: "abc",
      propertyName: "Europe Street beat",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
      id: "18",
    },
    {
      imgSrc:
        "https://plus.unsplash.com/premium_photo-1678286769514-e60a57a33b73?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "abc",
      propertyName: "Europe Street beat",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
      id: "19",
    },
    {
      imgSrc:
        "https://t4.ftcdn.net/jpg/00/98/30/93/360_F_98309392_LcMJtLXZMLLa9pdpuzwrY4MiwnihI2QT.jpg",
      alt: "abc",
      propertyName: "Europe Street beat",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
      id: "12",
    },
    {
      imgSrc:
        "https://img.freepik.com/free-photo/luxury-pool-villa-spectacular-contemporary-design-digital-art-real-estate-home-house-property-ge_1258-150762.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703203200&semt=ais",
      alt: "abc",
      propertyName: "Europe Street beat",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
      id: "13",
    },
    {
      imgSrc:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlsbGF8ZW58MHx8MHx8fDA%3D",
      alt: "abc",
      propertyName: "Europe Street beat",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
      id: "14",
    },
    {
      imgSrc:
        "https://plus.unsplash.com/premium_photo-1682889762731-375a6b22d794?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "abc",
      propertyName: "Europe Street beat",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
      id: "15",
    },
    {
      imgSrc:
        "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmlsbGF8ZW58MHx8MHx8fDA%3D",
      alt: "abc",
      propertyName: "Europe Street beat",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
      id: "16",
    },
    {
      imgSrc:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dmlsbGF8ZW58MHx8MHx8fDA%3D",
      alt: "abc",
      propertyName: "Europe Street beat",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
      id: "17",
    },
    {
      imgSrc:
        "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHZpbGxhfGVufDB8fDB8fHww",
      alt: "abc",
      propertyName: "Europe Street beat",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
      id: "18",
    },
    {
      imgSrc:
        "https://plus.unsplash.com/premium_photo-1678286769514-e60a57a33b73?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "abc",
      propertyName: "Europe Street beat",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
      id: "19",
    },
    {
      imgSrc:
        "https://t4.ftcdn.net/jpg/00/98/30/93/360_F_98309392_LcMJtLXZMLLa9pdpuzwrY4MiwnihI2QT.jpg",
      alt: "abc",
      propertyName: "Europe Street beat",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
      id: "12",
    },
    {
      imgSrc:
        "https://img.freepik.com/free-photo/luxury-pool-villa-spectacular-contemporary-design-digital-art-real-estate-home-house-property-ge_1258-150762.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1703203200&semt=ais",
      alt: "abc",
      propertyName: "Europe Street beat",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
      id: "13",
    },
    {
      imgSrc:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlsbGF8ZW58MHx8MHx8fDA%3D",
      alt: "abc",
      propertyName: "Europe Street beat",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
      id: "14",
    },
    {
      imgSrc:
        "https://plus.unsplash.com/premium_photo-1682889762731-375a6b22d794?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "abc",
      propertyName: "Europe Street beat",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
      id: "15",
    },
    {
      imgSrc:
        "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dmlsbGF8ZW58MHx8MHx8fDA%3D",
      alt: "abc",
      propertyName: "Europe Street beat",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
      id: "16",
    },
    {
      imgSrc:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dmlsbGF8ZW58MHx8MHx8fDA%3D",
      alt: "abc",
      propertyName: "Europe Street beat",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
      id: "17",
    },
    {
      imgSrc:
        "https://images.unsplash.com/photo-1613977257592-4871e5fcd7c4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHZpbGxhfGVufDB8fDB8fHww",
      alt: "abc",
      propertyName: "Europe Street beat",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
      id: "18",
    },
    {
      imgSrc:
        "https://plus.unsplash.com/premium_photo-1678286769514-e60a57a33b73?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "abc",
      propertyName: "Europe Street beat",
      propertyPageLink: "www.instagram.com",
      description: "abc abc",
      id: "19",
    },
  ];
  useEffect(() => {
    setIsMobile(windowWidth <= 500); // Set isMobile based on window width
  }, [windowWidth]);

  const handleCardClick = (id) => {
    dispatch(setLoader());
    router.push(`/home/resorts/${id}`);
  };
  
  const onFinish = async () => {
    setFlagTotriggerFetchFromHomePage(false);

    console.log(
      "occasionPax,occasionType,filterType,vacationBhk",
      occasionPax,
      occasionType,
      filterType,
      vacationBhk
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
      console.log("datadata", data);
      data.id = doc.id;

      if (filterType === "vacation") {
        const propertyBhk = Array.isArray(data?.bhk) ? data?.bhk.map(bhk => bhk.toLowerCase()) : [];
        if (!vacationBhk || propertyBhk.includes(vacationBhk.toLowerCase())) {
          console.log("vacationBhkvacationBhk", vacationBhk);
          filteredData.push(data);
        }

      } else if (filterType === "occasion") {
        const propertyOccasionType = Array.isArray(data?.occasionType) ? data?.occasionType.map(type => type.toLowerCase()) : [];
        const propertyPax = Array.isArray(data?.pax) ? data?.pax : [0, 0]; // Assuming default is no pax limit

        if (occasionPax) {
          const [minPax, maxPax] = occasionPax.split('-').map(Number); // Convert string range to array of numbers
          console.log("minPax, maxPax", minPax, maxPax);
          console.log("propertyPax", propertyPax);
          console.log("condition", (typeof occasionType === 'string' || !Array.isArray(occasionType) || occasionType.length === 0 || propertyOccasionType.includes(occasionType.toLowerCase())) &&
          (propertyPax[0] >= minPax && propertyPax[1] <= maxPax))
          console.log("condition2",propertyPax,minPax,maxPax,propertyPax[0] <= minPax && propertyPax[1] <= maxPax)

          if (
            (typeof occasionType === 'string' || !Array.isArray(occasionType) || occasionType.length === 0 || propertyOccasionType.includes(occasionType.toLowerCase())) &&
            propertyPax[1] >= maxPax
             // Check if property pax falls within occasionPax range
          ) {
            filteredData.push(data);
          }
        } else {
          // If occasionPax is null, include all properties
          filteredData.push(data);
        }

      } else {
        filteredData.push(data);
      }
    });

    if (filteredData && filteredData.length > 0) {
      console.log("filteredData", filteredData);
      setFilteredProperties(filteredData);
    } else {
      console.log("No properties found after filtering");
      dispatch(resetLoader());
      showNotification(
        "No Results Found",
        "Sorry, there are no matches for your search. Please adjust your filters and try again.",
        "warning"
      );
    }
};




  const handleBHKChange = (value) => {
    setvacationBhk(value);
  };

  const handleCheckOutTime = (value) => {
    console.log("checki in time", value);
    setCheckOutTime(value);
  };
  const handleCheckInTime = (value) => {
    console.log("checki out time", value);
    setCheckIntTime(value);
  };

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
  

  // const handleoccasionPaxChange = (value) => {
  //   setoccasionPax(value);
  // };
  const handleOcationTypeCHnage = (value) => {
    setOccasionType(value);
  };

  useEffect(() => {
    console.log("filteredProperties", filteredProperties);
    dispatch(resetLoader());
  }, [filteredProperties]);

  useEffect(() => {
    if (queryParamsRecivedFromHome != null && flagTotriggerFetchFromHomePage) {
      onFinish();
    } else if (!flagTotriggerFetchFromHomePage) {
      onFinish();
    }
  }, [queryParamsRecivedFromHome, flagTotriggerFetchFromHomePage, filterType]);

  const disabledDate = (current) => {
    // Disable dates in the past in the checkout datepicker
    return current && current < new Date().setHours(0, 0, 0, 0);
  };


  const [activeButton, setActiveButton] = useState('option1'); // Initial active button

  const handleButtonClick = (value) => {
    setActiveButton(value);
    // Perform any other actions when a button is clicked
  };


  const handlePhoneIconClick=()=>{
    window.location.href = 'tel:+919988337646';
  }
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


  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10; // Number of items per page

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfLastCard = currentPage * pageSize;
  const indexOfFirstCard = indexOfLastCard - pageSize;
  const currentCards = filteredProperties.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <>
      <div class="contactMain3">
        <div class="titleTxt5"> Explore our Best</div>
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.filterSection}>
          <Space.Compact
            direction="vertical"
            className={styles.propertiesLayout}
          >
            <span className={styles.filterTitleMain}>Here for?</span>
            {/* <Radio.Group
              options={optionsWithDisabled}
              onChange={onChangeofFilter}
              value={filterType}
              optionType="button"
              buttonStyle="solid"
              className="radioBtns"
            /> */}
            <div className={styles.customToggleButtonGroup}>
              <div
                className={`${styles.toggleButton} ${filterType === 'vacation' ? styles.active : ''}`}
                onClick={() => onChangeofFilter('vacation')}
              >
                Vacation
              </div>
              <div
                className={`${styles.toggleButton} ${filterType === 'occasion' ? styles.active : ''}`}
                onClick={() => onChangeofFilter('occasion')}
              >
                Occasion
              </div>
            </div>

            {filterType === "vacation" ? (
              <>
                <span className={styles.filterTitleMain}>
                  Select your preferred BHK
                </span>
                <Select
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  className="property-Filter"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={[
                    { value: "1BHK", label: "1BHK" },
                    { value: "2BHK", label: "2BHK" },
                    { value: "3BHK", label: "3BHK" },
                    { value: "4BHK", label: "4BHK" },
                    { value: "5BHK", label: "5BHK" },
                    { value: "6BHK", label: "6BHK" },
                  ]}
                  value={vacationBhk}
                  onChange={handleBHKChange}
                />
                <span className={styles.filterTitleMain}>Check In</span>
                <DatePicker
                  placement={"bottomLeft"}
                  placeholder="Check-In"
                  className="property-Filter"
                  onChange={handleCheckInTime}
                  value={checkIntTime && dayjs(checkIntTime, "DD/MM/YY")}
                  showSearch={false}
                  disabledDate={disabledDate}
                />
                <span className={styles.filterTitleMain}>Check Out</span>
                <DatePicker
                  placement={"bottomLeft"}
                  placeholder="Check-Out"
                  onChange={handleCheckOutTime}
                  value={checkOutTime && dayjs(checkOutTime, "DD/MM/YY")}
                  showSearch={false}
                  disabledDate={disabledDate}
                  className="property-Filter"
                />
              </>
            ) : (
              <>
                <span className={styles.filterTitleMain}>
                  Select Occasion Type
                </span>
                <Select
                  showSearch
                  placeholder="Search to Select"
                  className="property-Filter"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={occationOptions}
                  onChange={handleOcationTypeCHnage}
                  value={occasionType}
                />
                <span className={styles.filterTitleMain}>Select Pax Range</span>

                <Select
                  // showSearch
                  placeholder="Search to Select"
                  optionFilterProp="children"
                  // filterOption={(input, option) =>
                  //   (option?.label ?? "").includes(input)
                  // }
                  // filterSort={(optionA, optionB) =>
                  //   (optionA?.label ?? "")
                  //     .toLowerCase()
                  //     .localeCompare((optionB?.label ?? "").toLowerCase())
                  // }
                  options={occationPaxOptions}
                  // onChange={handleoccasionPaxChange}
                  onChange={(value) => setoccasionPax(value)}
                  value={occasionPax}
                  className="property-Filter"
                />
              </>
            )}
            <button className={styles.applyFilterBtn} onClick={onFinish}>
              Apply Filter
            </button>
          </Space.Compact>
        </div>

        {/* Property Cards Section */}
        {/* <div className={styles.cardContainer}>
          {filteredProperties?.map((card, index) => (
            <div key={index} className={styles.customCard} onClick={() => handleCardClick(card?.id)}>
              <div className={styles.cardImageWrapper}>
                <img
                  src={card?.images[0]}
                  // src={card?.imgSrc}
                  alt={card?.propertyName}
                  className={styles.cardImage}
                  onClick={() => handleCardClick(card?.id)}
                />
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{card?.propertyName}</h3>
                </div>
              </div>
              <div className={styles.additionalDetails}>
                {card?.bhk && (
                  <div className={styles.bhk}>
                    <img src={"bed.png"} alt="BHK" />
                    <span className={styles.bhkTxt}>{Array.isArray(card?.bhk) ? card?.bhk?.map(bhk => bhk?.replace("BHK", "")).join(', ') + "  BHK"  : card?.bhk}</span>
                  </div>
                )}
                {card?.propertyType == "occasion" && (
                  <div className={styles.bhk}>
                    <img src={"crowd2.png"} alt="BHK" />
                    <span className={styles.bhkTxt}>{card?.pax?.[1]}</span>
                  </div>
                )

                }
                <div className={styles.amenities}>
                  <img src={"aminites.png"} alt="Amenities" />
                  <span className={styles.amenitiesTxt}>
                    {card?.amenities?.length}+ Amenities
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div> */}
      {/* <div className={styles.cardsMainContainer}> */}
      <div className={styles.cardContainer}>
        {currentCards.map((card, index) => (
          <div key={index} className={styles.customCard} onClick={() => handleCardClick(card?.id)}>
            <div className={styles.cardImageWrapper}>
              <img
                src={card?.images[0]}
                alt={card?.propertyName}
                className={styles.cardImage}
                onClick={() => handleCardClick(card?.id)}
              />
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{card?.propertyName}</h3>
              </div>
            </div>
            <div className={styles.additionalDetails}>
              {card?.bhk && (
                <div className={styles.bhk}>
                  <img src={"bed.png"} alt="BHK" />
                  <span className={styles.bhkTxt}>
                    {Array.isArray(card?.bhk) ? card?.bhk?.map(bhk => bhk?.replace("BHK", "")).join(', ') + "  BHK" : card?.bhk}
                  </span>
                </div>
              )}
              {card?.propertyType === "occasion" && (
                <div className={styles.bhk}>
                  <img src={"crowd2.png"} alt="BHK" />
                  <span className={styles.bhkTxt}>{card?.pax?.[1]}</span>
                </div>
              )}
              <div className={styles.amenities}>
                <img src={"aminites.png"} alt="Amenities" />
                <span className={styles.amenitiesTxt}>{card?.amenities?.length}+ Amenities</span>
              </div>
            </div>
          </div>
        ))}
      </div >
    {/* </div> */}
      </div>
      <div   className={styles.pagination}>
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredProperties.length}
        onChange={handlePageChange}
      />
      </div>
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
    </>
  );
};

export default PropertyList;
