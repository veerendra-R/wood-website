import React, { useState, useEffect } from "react";
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
  notification,
} from "antd";
import { firestore } from ".././firebase";
import {
  collection,
  getDocs,
  query,
  where,
  getFirestore,
} from "firebase/firestore";
import styles from "../pages/home/homepage.module.scss";
import { QuestionCircleOutlined } from "@ant-design/icons";
import InquiryForm from "../components/InquiryForm";
import { showNotification } from '../components/notification';
import HomePage from './home/index'

const { Meta } = Card;
const { Option } = Select;
const { Search } = Input;
const Home = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [inqModalVisible, setInqModalVisible] = useState(false);

  // Function to fetch properties from Firestore
  const fetchProperties = async () => {
    try {
      // const citiesRef = collection(firestore, "users");
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
    fetchProperties();
  }, []);

  useEffect(() => {
    console.log("filteredProperties", filteredProperties);
  }, [filteredProperties]);


  return (
    <>
    <HomePage/>
    </>
  );
};

export default Home;
