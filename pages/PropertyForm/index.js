import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  Upload,
  message,
  Card,
  TimePicker,
  Tag,
  Spin,
  Alert,
  Modal,
  Slider
} from "antd";
import { InboxOutlined, PlusOutlined } from "@ant-design/icons";
import { firestore } from "../../firebase";
import {
  doc,
  setDoc,
  addDoc,
  collection,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDispatch } from "react-redux";
import {
  resetLoader,
  setLoader,
} from "../../components/reducers/reduxtoolkit/loaderSlice";
import { useRouter } from "next/router";
import moment from "moment";
import styles from "../properties/prop.module.scss";
import { Image, Transformation } from "cloudinary-react";
import { showNotification } from "../../components/notification";
// import ReactQuill from 'react-quill';

import dynamic from 'next/dynamic';
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

import 'react-quill/dist/quill.snow.css';

const { Option } = Select;
const { Dragger } = Upload;
const { TextArea } = Input;
const PropertyForm = () => {
  const timeFormat = 'HH:mm';
  const [form] = Form.useForm();
  const [propertyType, setPropertyType] = useState("");
  const [fileList, setFileList] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [houseRulesArr, setHouseRulesArr] = useState([]);
  const [houseRules, setHouseRules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [updateProperyDetails, setUpdateProperyDetails] = useState({});
  const dispatch = useDispatch();

  const handlePropertyChange = (value) => {
    setPropertyType(value);
  };

  const [imageUrls, setImageUrls] = useState([]);

  const handleUpload = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "ml_default"); // Replace with your upload preset

    // Upload image to Cloudinary
    // const response = await fetch(
    //   "https://api.cloudinary.com/v1_1/dution6q9/image/upload",
    //   {
    //     method: "POST",
    //     body: formData,
    //   }
    // );


    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dgz1wn9lj/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    console.log("data", data);
    // Set the uploaded image URL
    if (data) {
      return data.secure_url;
    }
  };

  const onFinish = async (values) => {
    dispatch(setLoader())

    console.log("finish");
    console.log("values", values);
    try {
      dispatch(setLoader())
      let dataRef = doc(firestore, "propertyDetails", values?.propertyName);
      // let dataRef = doc(firestore, "users", values?.propertyName);
      const documentSnapshot = await getDoc(dataRef);

      if (!documentSnapshot.exists()) {
        const newDocumentRef = await addDoc(
          collection(firestore, "propertyDetails"),
          // collection(firestore, "users"),
          {
            propertyName: values?.propertyName,
            // Other fields for a new document can be initialized here
          }
        );

        dataRef = newDocumentRef;
      }

      // const imageFiles = values.images || [];
      // const imageFiles = values?.images?.map((image) => image?.originFileObj);
      const imageFiles = fileList?.map((image) => image?.originFileObj);
      const uploadedImageUrls = [];
      const storage = getStorage();

      for (const imageFile of imageFiles) {
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!allowedTypes.includes(imageFile.type)) {
          message.error("Please select valid image files (JPEG, PNG, GIF).");
          return;
        }

        const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
        if (imageFile.size > maxSizeInBytes) {
          message.error("Image size exceeds the limit (5MB).");
          return;
        }

        const storageRef = ref(
          storage,
          `propertyImages/${dataRef.id}/${imageFile.name}`
        );
        // const snapshot = await uploadBytes(storageRef, imageFile);
        // const imageUrl = await getDownloadURL(snapshot.ref);
        const imageUrl = await handleUpload(imageFile);
        uploadedImageUrls.push(imageUrl);
      }

      await setDoc(dataRef, {
        checkIn: values?.checkIn?.$d ? values?.checkIn?.$d : null,
        checkOut: values?.checkOut?.$d ? values?.checkOut?.$d : null,
        mobileNumber: values?.mobileNumber ? values?.mobileNumber : null,
        propertyName: values?.propertyName,
        propertyType: values?.propertyType,
        guests: values?.guests ? values?.guests : null,
        price: values?.guests ? values?.price : null,
        occasionType: values?.occasionType ? values?.occasionType : null,
        images: uploadedImageUrls,
        description: values?.description,
        pax: values?.pax ? values?.pax : null,
        twitter: values?.twitter ? values?.twitter : null,
        youtubeLink: values?.youtubeLink ? values?.youtubeLink : null,
        email: values?.email ? values?.email : null,
        fblink: values?.fblink ? values?.fblink : null,
        instagramLink: values?.instagramLink ? values?.instagramLink : null,
        Threads: values?.Threads ? values?.Threads : null,
        bhk: values?.bhk ? values?.bhk : null,
        amenities: amenities?.map((amenity) => amenity.trim()),
        houseRules: houseRulesArr?.map((rule) => rule.trim()),
        subTitle: values?.subTitle,
        locationURL: values?.locationURL ? values?.locationURL : null,
        updatedAt: now.toISOString(),
      });
      // alert("Data submitted successfully!");
      showNotification(
        "Uploaded",
        "Property  uploaded successfully!",
        "success"
      );
      form.resetFields();
      setImageUrls([]);
      setFileList([]);
      setAmenities([]);
      setHouseRulesArr([]);
      dispatch(resetLoader());

    } catch (error) {
      console.error("Error adding document: ", error);
      // alert("Error submitting data. Please try again.");
      showNotification(
        "Failed",
        "an error occured while uploading property please try again!",
        "error"
      );
      dispatch(resetLoader());
    }
  };

  const now = new Date();

  const updateDocument = async (dataRef, values) => {
    console.log("dataRef, values, fileList", dataRef, values, fileList);
    try {
      const existingImageUrlsWithInfo = values?.images || [];
      const existingImageUrls = existingImageUrlsWithInfo?.map(
        (obj) => (typeof obj === 'object' ? obj?.url : obj)
      );
      
      console.log("existingImageUrls", existingImageUrls);
      const newImages = fileList.filter((file) => !file?.url);
      const imageFilesobjs = newImages?.map((image) => image?.originFileObj);
      console.log("newImages", newImages);
      // const uploadedImageUrls = [...existingImageUrls];
      const uploadedImageUrls = [];
      const storage = getStorage();

      for (const imageFile of imageFilesobjs) {
        const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
        if (!allowedTypes.includes(imageFile.type)) {
          message.error("Please select valid image files (JPEG, PNG, GIF).");
          return;
        }

        const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
        if (imageFile.size > maxSizeInBytes) {
          message.error("Image size exceeds the limit (5MB).");
          return;
        }

        const storageRef = ref(
          storage,
          `propertyImages/${dataRef.id}/${imageFile.name}`
        );
        // const snapshot = await uploadBytes(storageRef, imageFile);
        // const imageUrl = await getDownloadURL(snapshot.ref);
        const imageUrl = await handleUpload(imageFile); // Upload image to Cloudinary

        uploadedImageUrls.push(imageUrl);
      }

      // Combine existing and new images, removing deleted images
      const updatedImages = existingImageUrls
      .filter((url) => fileList.find((file) => file.url === url))
      .concat(uploadedImageUrls);


      console.log("uploadedImageUrls", uploadedImageUrls);
      console.log("updatedImages",updatedImages)
      // Replace checkIn and checkOut in values with Firestore Timestamps

      await updateDoc(dataRef, {
        checkIn: values?.checkIn?._d ? values?.checkIn?._d : null,
        checkOut: values?.checkOut?._d ? values?.checkOut?._d : null,
        mobileNumber: values?.mobileNumber ? values?.mobileNumber : null,
        propertyName: values?.propertyName ? values?.propertyName : null,
        propertyType: values?.propertyType ? values?.propertyType : null,
        occasionType: values?.occasionType ? values?.occasionType : null,
        images: updatedImages,
        price: values?.price ? values?.price : null,
        guests: values?.guests ? values?.guests : null,
        description: values?.description ? values?.description : null,
        pax: values?.pax ? values?.pax : null,
        twitter: values?.twitter ? values?.twitter : null,
        youtubeLink: values?.youtubeLink ? values?.youtubeLink : null,
        email: values?.email ? values?.email : null,
        fblink: values?.fblink ? values?.fblink : null,
        instagramLink: values?.instagramLink ? values?.instagramLink : null,
        Threads: values?.Threads ? values?.Threads : null,
        bhk: values?.bhk ? values?.bhk : null,
        amenities: amenities?.map((amenity) => amenity.trim()),
        houseRules: houseRulesArr?.map((rule) => rule.trim()),
        subTitle: values?.subTitle ?  values?.subTitle : null,
        locationURL: values?.locationURL ? values?.locationURL : null, // Concatenating new image URLs
        updatedAt: now.toISOString(),
      });

      return true; // Indicate successful update
    } catch (error) {
      console.error("Error updating document with images: ", error);
      return false; // Indicate failure
    }
  };

  const handleUpdate = async (values) => {
    dispatch(setLoader())
    console.log("update");
    try {
      dispatch(setLoader());
      let dataRef = doc(firestore, "propertyDetails", updateProperyDetails?.id);
      // let dataRef = doc(firestore, "users", updateProperyDetails?.id);
      const documentSnapshot = await getDoc(dataRef);

      if (documentSnapshot.exists()) {
        const updated = await updateDocument(dataRef, values, fileList);
        if (!updated) {
          throw new Error("Failed to update document");
        }
      } else {
        throw new Error("Document doesn't exist");
      }

      dispatch(resetLoader());
      // alert("Data submitted successfully!");
      form.resetFields();
      setImageUrls([]);
      setFileList([]);
      setAmenities([]);
      setHouseRulesArr([]);
      // alert("Data updated successfully!");
      showNotification(
        "Updated",
        "Property deatils updated successfully!",
        "success"
      );
      router.push("/admin");
      // Handle additional state updates or UI changes if needed
    } catch (error) {
      console.error("Error updating document: ", error);
      // alert("Error updating data. Please try again.");
      showNotification(
        "Failed to Updated",
        "An error occured in updatig the  deatils,please try again!",
        "errror"
      );
      dispatch(resetLoader());
    }
  };

  const handleFileChange = ({ fileList }) => {
    console.log("fileList", fileList);
    setFileList(fileList);
  };

  const TagInput = ({ tags, onInputChange, onClose }) => {
    const [inputValue, setInputValue] = useState("");

    const handleInputChange = (e) => {
      setInputValue(e.target.value);
    };

    const handleInputConfirm = () => {
      if (inputValue && tags.indexOf(inputValue) === -1) {
        onInputChange(inputValue);
      }
      setInputValue("");
    };

    return (
      <div>
        {tags.map((tag) => (
          <Tag closable onClose={() => onClose(tag)} key={tag}>
            {tag}
          </Tag>
        ))}
        <Input
          type="text"
          size="small"
          style={{ width: 78 }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      </div>
    );
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

  const router = useRouter();

  useEffect(() => {
    const getQueryParams = () => {
      const queryParams = router.query;
      const parsedQuery = { ...queryParams };

      // Parse JSON strings in query params
      try {
        if (queryParams?.propertyDetails) {
          parsedQuery.propertyDetails = JSON.parse(queryParams.propertyDetails);
        }
      } catch (error) {
        // Handle parsing errors if necessary
        console.error("Error parsing JSON:", error);
      }
      return parsedQuery;
    };

    const queryParams = getQueryParams();

    if (queryParams?.propertyDetails != null) {
      setUpdateFlag(true);
      setUpdateProperyDetails(queryParams?.propertyDetails);
    }
    console.log("queryParams", queryParams);
    if (queryParams?.propertyDetails?.propertyType) {
      setPropertyType(queryParams?.propertyDetails?.propertyType);
      setAmenities(queryParams?.propertyDetails?.amenities);
      setHouseRulesArr(queryParams?.propertyDetails?.houseRules);
      setFileList(
        queryParams?.propertyDetails?.images.map((imageUrl) => ({
          uid: imageUrl, // Use unique identifier for each image, for example, the image URL
          name: "image.png", // Set a default name for the image
          status: "done", // Set the status as 'done' to show the preview
          url: imageUrl, // Set the URL for the image preview
        })) || []
      );

      const checkInTimestamp =
        queryParams?.propertyDetails?.checkIn?.seconds || 0;
      const checkOutTimestamp =
        queryParams?.propertyDetails?.checkOut?.seconds || 0;

      const checkInTime = moment.unix(checkInTimestamp).format("HH:mm");
      const checkOutTime = moment.unix(checkOutTimestamp).format("HH:mm");

      form.setFieldsValue({
        propertyName: queryParams?.propertyDetails?.propertyName,
        propertyType: queryParams?.propertyDetails?.propertyType,
        subTitle: queryParams?.propertyDetails?.subTitle,
        description: queryParams?.propertyDetails?.description,
        bhk: queryParams?.propertyDetails?.bhk,
        pax: queryParams?.propertyDetails?.pax,
        price: queryParams?.propertyDetails?.price,
        guests:queryParams?.propertyDetails?.guests,
        occasionType: queryParams?.propertyDetails?.occasionType,

        checkIn: moment(checkInTime, "HH:mm"),
        checkOut: moment(checkOutTime, "HH:mm"),

        email: queryParams?.propertyDetails?.email,
        mobileNumber: queryParams?.propertyDetails?.mobileNumber,

        youtubeLink: queryParams?.propertyDetails?.youtubeLink,
        instagramLink: queryParams?.propertyDetails?.instagramLink,
        Threads: queryParams?.propertyDetails?.Threads,
        twitter: queryParams?.propertyDetails?.twitter,

        images: queryParams?.propertyDetails?.images,
        amenities: queryParams?.propertyDetails?.amenities,
        locationURL: queryParams?.propertyDetails?.locationURL,
        houseRules: queryParams?.propertyDetails?.houseRules,
      });

      // form.setFieldsValue(queryParams?.propertyDetails);
    }
  }, [router.query]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleCancel = () => setPreviewOpen(false);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const handleRemove = async (file) => {
    const index = fileList.indexOf(file);
    const newFileList = fileList.slice();
    newFileList.splice(index, 1);
    setFileList(newFileList);
  };

  useEffect(() => {
    dispatch(resetLoader());
  },[]);




  const [paxValues, setPaxValues] = useState([0, 0]);
  const handleSliderChange = (value) => {
    setPaxValues(value);
  };




const handleLo = ()=>{
  dispatch(setLoader())
}

  return (
    <div className="property-form">

      {/* <img src={"https://drive.google.com/uc?id=1T0yPmMMlkNiW7EpM5Cz_QguAkCZrKzne"} alt={"property image"}/> */}
      <Form
        form={form}
        layout="vertical"
        onFinish={updateFlag ? handleUpdate : onFinish}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault(); // Prevent the default form submission
          }
        }}
        initialValues={{ pax: [0, 0] }}
      >
        <Form.Item
          name="propertyType"
          label="Property Type"
          rules={[{ required: true, message: "Please select property type" }]}
        >
          <Select onChange={handlePropertyChange}>
            <Option value="vacation">Vacation</Option>
            <Option value="occasion">Occasion</Option>
          </Select>
        </Form.Item>

        {propertyType === "vacation" && (
          <>
            <Form.Item
              name="propertyName"
              label="Property Name"
              rules={[
                { required: true, message: "Please enter property name" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="subTitle"
              label="Property Sub Heading"
              rules={[
                {
                  required: true,
                  message: "Please enter  property Sub Heading",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="About Property"
              rules={[
                {
                  required: true,
                  message: "Please provide description abput property",
                },
              ]}
            >
              {/* <Input className="aboutPropertyInput" /> */}
              {/* <TextArea
                placeholder="Please provide description abput property"
                autoSize={{ minRows: 3, maxRows: 6 }}
                onPressEnter={(e) => e.shiftKey && e.preventDefault()}
              /> */}
              <ReactQuill />
            </Form.Item>

            <div className="propertyTimingsFields">
              <Form.Item
                name="checkIn"
                label="Check In"
                rules={[
                  { required: true, message: "Please select check-in time" },
                ]}
              >
                <TimePicker  format={timeFormat}/>
              </Form.Item>
              <Form.Item
                name="checkOut"
                label="Check Out"
                rules={[
                  { required: true, message: "Please select check-out time" },
                ]}
              >
                <TimePicker  format={timeFormat}/>
              </Form.Item>
              <Form.Item
                name="bhk"
                label="BHK"
                rules={[{ required: true, message: "Please select pax" }]}
              >
                <Select className="bhkSelectionField" mode="multiple">
                  <Option value="1BHK">1BHK</Option>
                  <Option value="2BHK">2BHK</Option>
                  <Option value="3BHK">3BHK</Option>
                  <Option value="4BHK">4BHK</Option>
                  <Option value="5BHK">5BHK</Option>
                  <Option value="6BHK">6BHK</Option>
                </Select>
              </Form.Item>
              {/* <Form.Item
                name="propertyType"
                label="Property Type"
                rules={[
                  { required: true, message: "Please enter property type" },
                ]}
              >
                <Input />
              </Form.Item> */}
            </div>
            <div>
              <Form.Item
                name="guests"
                label="No of Guests"
                className="mobileNumberItem"
                rules={[
                  { required: true, message: "Please enter No of Guests" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="price"
                label="Price Starts From"
                className="mobileNumberItem"
                rules={[
                  { required: true, message: "Please enter starting price" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div className="propertyTimingsFields">
              <Form.Item
                name="mobileNumber"
                label="Mobile Number"
                className="mobileNumberItem"
                // rules={[
                //   { required: true, message: "Please enter mobile number" },
                // ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                className="mobileNumberItem"
                // rules={[
                //   { required: true, message: "Please enter mobile number" },
                // ]}
              >
                <Input />
              </Form.Item>
            </div>
            <Form.Item label="Amenities">
              <TagInput
                tags={amenities}
                onInputChange={(inputValue) =>
                  setAmenities([...amenities, inputValue])
                }
                onClose={(removedTag) =>
                  setAmenities(amenities.filter((tag) => tag !== removedTag))
                }
              />
            </Form.Item>
            <Form.Item label="House Rules">
              <TagInput
                tags={houseRulesArr}
                onInputChange={(inputValue) =>
                  setHouseRulesArr([...houseRulesArr, inputValue])
                }
                onClose={(removedTag) =>
                  setHouseRulesArr(
                    houseRulesArr?.filter((tag) => tag !== removedTag)
                  )
                }
              />
            </Form.Item>
            <Form.Item name="locationURL" label="Location Link">
              <Input />
            </Form.Item>
            <Form.Item name="fblink" label="Facebook Link">
              <Input />
            </Form.Item>
            <Form.Item name="instagramLink" label="Instagram Link">
              <Input />
            </Form.Item>
            <Form.Item name="youtubeLink" label="Youtube Link">
              <Input />
            </Form.Item>
            <Form.Item name="twitter" label="Twitter Link">
              <Input />
            </Form.Item>
            <Form.Item name="Threads" label="Threads Link">
              <Input />
            </Form.Item>
            <Form.Item
              name="images"
              label="Upload Image"
              rules={[
                {
                  required:
                    fileList.length != null && fileList != [] ? false : true,
                  message: "Please upload atleast one image!!",
                },
              ]}
            >
              <Upload
                fileList={fileList}
                beforeUpload={() => false}
                onChange={handleFileChange}
                listType="picture-card"
                onPreview={handlePreview}
                onRemove={handleRemove}
              >
                {/* {fileList.length >= 8 ? null : uploadButton} */}
                {uploadButton}
              </Upload>
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{
                    width: "100%",
                  }}
                  src={previewImage}
                />
              </Modal>
            </Form.Item>
          </>
        )}

        {propertyType === "occasion" && (
          <>
            {/* Occasion-specific fields */}
            <Form.Item
              name="propertyName"
              label="Property Name"
              rules={[
                { required: true, message: "Please enter property name" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="subTitle"
              label="Property Sub Heading"
              rules={[
                {
                  required: true,
                  message: "Please enter  property Sub Heading",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="description"
              label="About Property"
              rules={[
                {
                  required: true,
                  message: "Please provide description abput property",
                },
              ]}
            >
              {/* <TextArea
                placeholder="Please provide description abput property"
                autoSize={{ minRows: 3, maxRows: 6 }}
                onPressEnter={(e) => e.shiftKey && e.preventDefault()}
              /> */}
               <ReactQuill />
            </Form.Item>
            <Form.Item
              name="occasionType"
              label="Occasion Type"
              rules={[
                { required: true, message: "Please select occasion type" },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                defaultValue={["birthday", "Kids-Birthday"]}
                options={occationOptions}
              />
            </Form.Item>
            {/* <Form.Item
              name="pax"
              label="Pax"
              rules={[{ required: true, message: "Please select pax" }]}
            >
              <Select>
                <Option value="25-50">25-50</Option>
                <Option value="50-100">50-100</Option>
                <Option value="100-200">100-200</Option>
                <Option value="200-350">200-350</Option>
                <Option value="350-500">350-500</Option>
                <Option value="500-1000">500-1000</Option>
              </Select>
            </Form.Item> */}
            <Form.Item
              name="pax"
              label="Pax"
              rules={[{ required: true, message: 'Please select pax range' }]}
            >
              <Slider range min={0} max={10000} value={paxValues} onChange={handleSliderChange} />
            </Form.Item>
            <Form.Item label="Amenities">
              <TagInput
                tags={amenities}
                onInputChange={(inputValue) =>
                  setAmenities([...amenities, inputValue])
                }
                onClose={(removedTag) =>
                  setAmenities(amenities.filter((tag) => tag !== removedTag))
                }
              />
            </Form.Item>
            <Form.Item label="House Rules">
              <TagInput
                tags={houseRulesArr}
                onInputChange={(inputValue) =>
                  setHouseRulesArr([...houseRulesArr, inputValue])
                }
                onClose={(removedTag) =>
                  setHouseRulesArr(
                    houseRulesArr?.filter((tag) => tag !== removedTag)
                  )
                }
              />
            </Form.Item>
            <div>
              <Form.Item
                name="price"
                label="Price Starts From"
                className="mobileNumberItem"
                rules={[
                  { required: true, message: "Please enter starting price" },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <Form.Item
              name="mobileNumber"
              label="Mobile Number"
              // rules={[
              //   { required: true, message: "Please enter mobile number" },
              // ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              // rules={[
              //   { required: true, message: "Please enter mobile number" },
              // ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="locationURL"
              label="Location Link"
              rules={[
                { required: true, message: "Please paste the location url!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="fblink" label="Facebook Link">
              <Input />
            </Form.Item>
            <Form.Item name="instagramLink" label="Instagram Link">
              <Input />
            </Form.Item>
            <Form.Item name="youtubeLink" label="Youtube Link">
              <Input />
            </Form.Item>
            <Form.Item name="twitter" label="Twitter Link">
              <Input />
            </Form.Item>
            <Form.Item name="Threads" label="Threads Link">
              <Input />
            </Form.Item>
            <Form.Item
              name="images"
              label="Upload Image"
              rules={[
                {
                  required:
                    fileList.length != null && fileList != [] ? false : true,
                  message: "Please upload atleast one image!!",
                },
              ]}
            >
              <Upload
                fileList={fileList}
                beforeUpload={() => false}
                onChange={handleFileChange}
                listType="picture-card"
                onPreview={handlePreview}
                onRemove={handleRemove}
              >
                {/* {fileList.length >= 8 ? null : uploadButton} */}
                {uploadButton}
              </Upload>
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
              >
                <img
                  alt="example"
                  style={{
                    width: "100%",
                  }}
                  src={previewImage}
                />
              </Modal>
            </Form.Item>
          </>
        )}
        <Form.Item>
          <button
            htmlType="submit"
            className={styles.applyFilterBtn}
          >
            {updateFlag ? "Update Property" : "Upload Property"}
          </button>
        </Form.Item>
      </Form>
    </div>
  );
};  

export default PropertyForm;
