import React, { useState, useEffect } from "react";
import {
  Card,
  Select,
  Button,
  Modal,
  Form,
  Input,
  Image,
  DatePicker,
  Row,
  Col,
} from "antd";
import { firestore } from "../../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { InboxOutlined } from "@ant-design/icons";
import styles from "../admin/admin.module.scss";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import {
  setLoader,
  resetLoader,
} from "../../components/reducers/reduxtoolkit/loaderSlice";
import { showNotification } from "../../components/notification";

const { Option } = Select;

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [visible, setVisible] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [propertyType, setPropertyType] = useState(null);
  const [propertyToDelete, setPropertyToDelete] = useState(null);
  const [confirmDlt, setConfirmDlt] = useState();
  const dispatch = useDispatch();
  const router = useRouter()

  const [form] = Form.useForm();

  const showModal = (property) => {
    setSelectedProperty(property);
    setPropertyType(property?.propertyType);
    setVisible(true);
    form.setFieldsValue(property);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleUpdate = async () => {
    try {
      await updateDoc(
        doc(firestore, "propertyDetails", selectedProperty?.id),
        form?.getFieldsValue()
      );
      setVisible(false);
      fetchProperties();
    } catch (error) {
      console.error("Error updating property: ", error);
    }
  };
  const handleDelete = async (propertyId, imageUrls) => {
    const propertytoDltDetails = {
      propertyId: propertyId,
      imageUrls: imageUrls,
    };

    if (propertytoDltDetails) {
      setPropertyToDelete(propertytoDltDetails);
      setConfirmDlt(true);
    }

    //  try {
    //     if (imageUrls && imageUrls?.length > 0) {
    //       const storage = getStorage();
    //       imageUrls?.forEach(async (url) => {
    //         const imageRef = ref(storage, url);
    //         deleteObject(imageRef)
    //           .then(() => {
    //             console.log("File deleted successfully");
    //           })
    //           .catch((error) => {
    //             console.log("Uh-oh, an error occurred!", error);
    //           });
    //       });
    //     }
    //     // Delete property document from Firestore
    //     await deleteDoc(doc(firestore, "propertyDetails", propertyId));
    //     fetchProperties();
    //   } catch (error) {
    //     console.error("Error deleting property: ", error);
    //   }
  };

  const handleDeleteConfirm = async () => {
    setConfirmDlt(false)
    try {
      dispatch(setLoader());
  
      if (
        propertyToDelete?.imageUrls &&
        propertyToDelete?.imageUrls?.length > 0
      ) {
        try {
          await Promise.all(
            propertyToDelete?.imageUrls?.map(async (url) => {
              try {
                const regex = /\/v\d+\/([^/]+)\.\w{3,4}$/;
                const matchedRegex = url.match(regex);
                const publicId = matchedRegex ? matchedRegex[1] : null;

                console.log("Deleting image with publicId:", publicId);
  
                // Make a request to delete the image using the serverless function
                const response = await fetch('/api/deleteImage', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ publicId }),
                });
  
                const data = await response.json();
                console.log("Response from deletion API:", data);
              } catch (error) {
                console.error("Error deleting image from Cloudinary:", error);
              }
            })
          );
          console.log("All images deleted successfully");
        } catch (error) {
          console.error("Error deleting images:", error);
        }
      }
  
      // Delete property document from Firestore
      await deleteDoc(
        doc(firestore, "propertyDetails", propertyToDelete?.propertyId)
      );
      fetchProperties();
      setConfirmDlt(false);
      dispatch(resetLoader());
      showNotification(
        "Deleted",
        "Property  removed from the listing  successfully!",
        "success"
      );
    } catch (error) {
      console.error("Error deleting property: ", error);
      setConfirmDlt(false);
      dispatch(resetLoader());
    }
  };
  
  const handleDeleteConfirmCancel = () => {
    setConfirmDlt(false);
    dispatch(resetLoader());
  };

  const [searchTerm, setSearchTerm] = useState("");
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
    fetchProperties();
  }, []);

  const handleFilterChange = (value) => {
    setFilterType(value);
    if (value === "all") {
      setFilteredProperties(properties);
    } else {
      const filtered = properties.filter(
        (property) => property.propertyType === value
      );
      setFilteredProperties(filtered);
    }
  };

  useEffect(() => {
    if (filteredProperties) {
      console.log("filteredProperties", filteredProperties);
    }
  }, [filteredProperties]);

  const handleSearch = (term) => {
    console.log("term", term);
    setSearchTerm(term);
    const filtered = properties?.filter((property) => {
      const { propertyType, bhk, propertyName } = property;
      return (
        propertyType?.toLowerCase().includes(term.toLowerCase()) ||
        (bhk && typeof bhk === 'string' && bhk.toLowerCase().includes(term.toLowerCase())) ||
        propertyName?.toLowerCase().includes(term.toLowerCase())
              );
    });
    setFilteredProperties(filtered);
  };

  const handleCardClick = (id) => {
    console.log("handleCardClick",id)
    // dispatch(setLoader());
    router.push(`/home/resorts/${id}`);
  };

  const handlePropertyEditfn = (property)=>{
    console.log("property",property)
    if (property != null) {
      const queryParams = {
        propertyDetails: property,
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
      router.push(`/PropertyForm?${queryString}`);
  }
}

  return (
    <div>
      <div className={styles.filterOtions}>
        <Select
          style={{ width: 300, display: "flex", justifyContent: "center" }}
          onChange={handleFilterChange}
          defaultValue={"all"}
        >
          <Option value="all">All</Option>
          <Option value="vacation">Vacation</Option>
          <Option value="occasion">Occasion</Option>
        </Select>
        <div>
          <Input
            type="text"
            placeholder="Search properties"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.cardContainer}>
        {filteredProperties?.map((card, index) => (
          <div key={index} className={styles.customCard}>
            <div className={styles.cardImageWrapper}>
              <img
                src={card?.images?.[0]}
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
                  {/* <span className={styles.bhkTxt}>{card?.bhk}</span> */}
                  <span className={styles.bhkTxt}>{Array.isArray(card?.bhk) ? card?.bhk?.map(bhk => bhk?.replace("BHK", "")).join(', ') + "  BHK"  : card?.bhk}</span>
                </div>
              )}
              <div className={styles.amenities}>
                <img src={"aminites.png"} alt="Amenities" />
                <span className={styles.amenitiesTxt}>
                  {card?.amenities?.length}+ Amenities
                </span>
              </div>
            </div>
            <div className={styles.actionItems}>
              <Button key="edit" onClick={() => handlePropertyEditfn(card)}>
                Edit
              </Button>
              <Button
                key="delete"
                onClick={() => handleDelete(card?.id, card?.images)}
                danger
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", marginTop: 20 }}>
        {/* <Row gutter={[24, 8]}>
          {filteredProperties &&
            filteredProperties?.map((property) => (
              <Col span={8}>
                <Card
                  key={property?.id}
                  title={property?.propertyName}
                  actions={[
                    <Button key="edit" onClick={() => showModal(property)}>
                      Edit
                    </Button>,
                    <Button
                      key="delete"
                      onClick={() =>
                        handleDelete(property?.id, property?.images)
                      }
                      danger
                    >
                      Delete
                    </Button>,
                  ]}
                >
                  <Image.PreviewGroup items={property.images}>
                    <div className="propertyImgCard">
                      <Image
                        className="imgProperty"
                        src={property.images?.[0]}
                        height={400}
                      />
                    </div>
                  </Image.PreviewGroup>
                  <p>Property Type: {property.propertyType}</p>
                  <p>Mobile Number: {property.mobileNumber}</p>
                </Card>
              </Col>
            ))}
        </Row> */}
      </div>

      {/* <Modal
        title="Edit Property"
        visible={visible}
        onCancel={handleCancel}
        onOk={handleUpdate}
      >
        <Form form={form}>
          <Form.Item name="propertyName" label="Property Name">
            <Input />
          </Form.Item>
          <Form.Item name="propertyType" label="Property Type">
            <Input />
          </Form.Item>
          <Form.Item name="mobileNumber" label="Mobile Number">
            <Input />
          </Form.Item>
        </Form>
      </Modal> */}
      <Modal
        title="Edit Property"
        visible={visible}
        onCancel={handleCancel}
        onOk={handleUpdate}
      >
        <Form form={form} initialValues={selectedProperty}>
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
                name="propertyType"
                label="Property Type"
                rules={[
                  { required: true, message: "Please enter property type" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="mobileNumber"
                label="Mobile Number"
                rules={[
                  { required: true, message: "Please enter mobile number" },
                ]}
              >
                <Input />
              </Form.Item>
            </>
          )}

          {propertyType === "occasion" && (
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
                name="propertyType"
                label="Property Type"
                rules={[
                  { required: true, message: "Please enter property type" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="mobileNumber"
                label="Mobile Number"
                rules={[
                  { required: true, message: "Please enter mobile number" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="occasionType"
                label="Occasion Type"
                rules={[
                  { required: true, message: "Please select occasion type" },
                ]}
              >
                <Select>
                  <Option value="birthday">Birthday</Option>
                  <Option value="bachelorsParty">Bachelor's Party</Option>
                  {/* Add other occasion types */}
                </Select>
              </Form.Item>
              <Form.Item
                name="pax"
                label="Pax"
                rules={[{ required: true, message: "Please select pax" }]}
              >
                <Select>
                  <Option value="25-50">25-50</Option>
                  <Option value="50-100">50-100</Option>
                </Select>
              </Form.Item>
            </>
          )}

          {propertyType === "both" && (
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
                name="propertyType"
                label="Property Type"
                rules={[
                  { required: true, message: "Please enter property type" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="mobileNumber"
                label="Mobile Number"
                rules={[
                  { required: true, message: "Please enter mobile number" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="occasionType"
                label="Occasion Type"
                rules={[
                  { required: true, message: "Please select occasion type" },
                ]}
              >
                <Select>
                  <Option value="birthday">Birthday</Option>
                  <Option value="bachelorsParty">Bachelor's Party</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="pax"
                label="Pax"
                rules={[{ required: true, message: "Please select pax" }]}
              >
                <Select>
                  <Option value="25-50">25-50</Option>
                  <Option value="50-100">50-100</Option>
                </Select>
              </Form.Item>
            </>
          )}
        </Form>
      </Modal>
      <Modal
        title={`Are you trying to delete the property`}
        open={confirmDlt}
        footer={null}
      >
        <div className={styles.dltButtons}>
          <button onClick={handleDeleteConfirm} className={styles.dltButton}>
            Delete
          </button>
          <button
            onClick={handleDeleteConfirmCancel}
            className={styles.dltCancel}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default PropertyList;
