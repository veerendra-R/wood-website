// components/InquiryForm.js

import React, { useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Button,
  InputNumber,
  notification,
} from "antd";
import moment from "moment";
import emailjs from "emailjs-com";
import { showNotification } from "./notification";
import styles from "../pages/properties/properties.module.scss";
import {
  setLoader,
  resetLoader,
} from "../components/reducers/reduxtoolkit/loaderSlice";
import { useDispatch } from "react-redux";
const { TextArea } = Input;

// emailjs.init('xwAq-0ho-HD_8d_4j');
emailjs.init("f0VZ48Y905KPTH2In");
const InquiryForm = (props) => {
  console.log("props", props);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [checkinDate, setCheckinDate] = useState("");
  const [checkoutDate, setCheckoutDate] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [numberOfMembers, setNumberOfMembers] = useState("");
  const [formData, setFormData] = useState({
    checkinDate: "",
    checkoutDate: "",
    contactName: "",
    contactEmail: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "checkinDate":
        setCheckinDate(value);
        break;
      case "checkoutDate":
        setCheckoutDate(value);
        break;
      case "contactName":
        setContactName(value);
        break;
      case "contactEmail":
        setContactEmail(value);
        break;
      case "numberOfMembers":
        setNumberOfMembers(value);
        break;
      default:
        break;
    }
  };
  const message = props?.props?.fromContactPage
    ? "Your Request to Contact or Partner with Us has been Sent!"
    : "The Inquiry Email has been sent!";

  const handleSubmit = (values) => {
    dispatch(setLoader());
    console.log("values", values);

    // Send inquiry email using EmailJS
    // emailjs
    //   .send('service_0o92v6t', 'template_kwrsl22', {
    //     checkinDate: moment(values?.checkinDate).format('YYYY-MM-DD'),
    //     checkoutDate: moment(values?.checkoutDate).format('YYYY-MM-DD'),
    //     contactName: values?.contactName,
    //     contactEmail: values?.contactEmail,
    //     numberOfMembers: values?.numberOfMembers,
    //     // villaName: villa?.name,
    //   })
    //   .then(() => {
    //     // Email sent successfully
    //     props?.handleModalChangeFromform()
    //     console.log('Email sent successfully');
    //     // onClose();
    //     showNotification(
    //       "Success!!",
    //       "The Inquiry Email has been sent!",
    //       "success"
    //     );
    //     dispatch(resetLoader());

    //   })
    //   .catch((error) => {
    //     // Email sending failed
    //     dispatch(resetLoader());
    //     console.error('Email sending failed:', error);
    //   });

    // new rks email
    emailjs
      .send("service_8uob5un", "template_zjovoq4", {
        checkinDate: moment(values?.checkinDate).format("YYYY-MM-DD"),
        checkoutDate: moment(values?.checkoutDate).format("YYYY-MM-DD"),
        contactName: values?.contactName,
        contactEmail: values?.contactEmail,
        numberOfMembers: values?.numberOfMembers,
        MobileNumber: values?.MobileNumber,
        Message: values?.Message,
      })
      .then(() => {
        // Email sent successfully
        if (!props?.props?.fromContactPage) {
          props?.handleModalChangeFromform();
        }
        console.log("Email sent successfully");

        // onClose();
        showNotification("Success!!", message, "success");
        form.resetFields();
        dispatch(resetLoader());
      })
      .catch((error) => {
        // Email sending failed
        dispatch(resetLoader());
        console.error("Email sending failed:", error);
        showNotification("Failed!!", "Failed to send a message", "error");
      });
  };

  return (
    <div>
      {props?.props?.fromContactPage && !props?.props?.fromPartnerPage ? (
        <span className={styles.formTxt}>Connect</span>
      ) : (
        <span className={styles.formTxt}>
          {props?.props?.fromPartnerPage
            ? "Let's Partner UP!"
            : "Drop an enquiry"}
        </span>
      )}
      <Form form={form} onFinish={handleSubmit} layout="vertical">
        <Form.Item
          name="contactName"
          label={<span className={styles.formLable}>Full Name</span>}
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="MobileNumber"
          label={<span className={styles.formLable}>Mobile Number</span>}
          rules={[
            { required: true, message: "Please enter your mobile number" },
            { type: "mobile", message: "Please enter a mobile number" },
          ]}
        >
          <Input />
        </Form.Item>
        {!props?.props?.fromContactPage && (
          <Form.Item
            name="checkinDate"
            label={<span className={styles.formLable}>Check-In</span>}
            rules={[
              { required: true, message: "Please select a check-in date" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        )}
        {!props?.props?.fromContactPage && (
          <Form.Item
            name="checkoutDate"
            label={<span className={styles.formLable}>Check-Out</span>}
            rules={[
              { required: true, message: "Please select a check-out date" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>
        )}
        {!props?.props?.fromContactPage && (
          <Form.Item
            name="numberOfMembers"
            label={<span className={styles.formLable}>Number of Members</span>}
            rules={[
              { required: true, message: "Please enter the number of members" },
            ]}
          >
            <InputNumber min={1} style={{ width: "100%" }} />
          </Form.Item>
        )}
        <Form.Item
          name="contactEmail"
          label={<span className={styles.formLable}>Your Email</span>}
          // rules={[
          //   { required: true, message: 'Please enter your email' },
          //   { type: 'email', message: 'Please enter a valid email' },
          // ]}
        >
          <Input />
        </Form.Item>
        {
          <Form.Item
            name="Message"
            label={<span className={styles.formLable}>Message</span>}
            rules={[
              { required: true, message: "Please enter message to send!" },
            ]}
          >
            {/* <Input className="aboutPropertyInput" /> */}
            <TextArea
              placeholder="Please enter property name"
              autoSize={{ minRows: 3, maxRows: 6 }}
            />
          </Form.Item>
        }

        <Form.Item>
          <div className="enquirySubmitBtn">
            <Button type="primary" htmlType="submit">
              {!props?.props?.fromContactPage ? "Send Enquiry" : "Contact Us"}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default InquiryForm;
