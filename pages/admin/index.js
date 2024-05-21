import { useEffect, useState } from "react";
import { Modal, Input, Button, Form, message, Radio,Space } from "antd";
import PropertyForm from "../PropertyForm";
import PropertesForAdmin from "../propertiesForAdmin";
import { EyeInvisibleOutlined, EyeOutlined ,UserOutlined} from "@ant-design/icons";
import styles from '../../pages/properties/properties.module.scss';
import style1 from "./admin.module.scss"
import { resetLoader, setLoader } from "../../components/reducers/reduxtoolkit/loaderSlice";
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth } from 'firebase/auth';
import { app } from '../../firebase';

import { useDispatch } from "react-redux";

const AuthComponent = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [viewProperties, setViewProperties] = useState(false);
  const [uploadProperty, setUploadProperty] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      setAuthenticated(true);
    }
  }, []);

  const onSuccess = () => {
    setAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    setAuthenticated(false);
  };

  const onFinish = async () => {
    try {
      const authInstance = getAuth(app);
      const userCredential = await signInWithEmailAndPassword(authInstance, email, password);

      const accessToken = await userCredential.user.getIdToken();
      localStorage.setItem('accessToken', accessToken);

      message.success('Login successful');
      setAuthenticated(true);
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  const btnOnChange = (e) => {
    setViewProperties(e?.target?.value === 'ViewProperties');
    setUploadProperty(e?.target?.value === 'UploadProperties');
  };

  const handleProfileClick = () => {
    setProfileModalVisible(true);
  };

  const handleProfileModalCancel = () => {
    setProfileModalVisible(false);
  };

  return  (
    <div className={style1.maindiv}>
    <div className={style1.adminContainer}>
      {!authenticated ? (
        <div className={style1.loginForm} >
          <h3 className={style1.titleTxt}>Hello Admin,<br/>Please enter your Credential's to continue</h3>
          <Form onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password onChange={(e) => setPassword(e.target.value)} />
            </Form.Item>

              <div className={style1.btnCont} >
              <button className={style1.submitBtn} htmlType="submit">
                Log In
              </button>
              </div>
          </Form>
          {error && <p className={styles.errorMessage}>Incorrect email or password. Please try again.</p>}
        </div>
      ) : (
        <>
          <div className={style1.profile}>
            <UserOutlined onClick={handleProfileClick} className="adminIcon"/>
          </div>
          <h3 className={style1.titleTxt}>Hello Admin <br/>Here to?</h3>
          <div className="propertiesAdmin">
            <Space.Compact direction="vertical">
              <Radio.Group
                options={[
                  { label: 'View Properties', value: 'ViewProperties' },
                  { label: 'Upload New Property', value: 'UploadProperties' },
                ]}
                onChange={btnOnChange}
                optionType="button"
                buttonStyle="solid"
                className="radioBtns"
              />
            </Space.Compact>
          </div>
          <div className={style1.propertyComponents}>
            {viewProperties && <PropertesForAdmin />}
            {uploadProperty && <PropertyForm />}
          </div>
          <Modal
            title="Profile"
            visible={profileModalVisible}
            onCancel={handleProfileModalCancel}
            footer={[
              <Button key="logout" onClick={handleLogout}>
                Logout
              </Button>,
              <Button key="cancel" onClick={handleProfileModalCancel}>
                Cancel
              </Button>,
            ]}
          >
            <p>Logged in as admin</p>
          </Modal>
        </>
      )}
    </div>
    </div>
  );
};

export default AuthComponent;

