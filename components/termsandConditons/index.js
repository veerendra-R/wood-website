import { useEffect, useState } from 'react';
import { storage } from "../../firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Spin } from "antd";
import styles from './PrivacyPolicy.module.scss';

const TermsAndConditions = () => {
  const [termsHtml, setTermsHtml] = useState('');
  const [loading, setLoading] = useState(true); // State to control the loading spinner
  const storageRef = ref(storage, 'TandCFiles/terms_conditons.html');

  useEffect(() => {
    getDownloadURL(storageRef)
      .then(url => {
        console.log('Download URL:', url); // Log the download URL for debugging
        fetch(url) // Remove mode: 'no-cors' option
          .then(response => response.text())
          .then(html => {
            setTermsHtml(html);
            setLoading(false); // Set loading to false when HTML content is loaded
          })
          .catch(error => {
            console.error('Error fetching terms and conditions:', error);
            setLoading(false); // Set loading to false if there's an error
          });
      })
      .catch(error => {
        console.error('Error getting download URL:', error);
        setLoading(false); // Set loading to false if there's an error
      });
  }, []);

  return (
    <div className={styles.container}>
      {loading ? ( // Show Spin loader while loading
        <Spin size="large" className='spinner'/>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: termsHtml }} />
      )}
    </div>
  );
};

export default TermsAndConditions;
