import { Provider } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";
import NewPageLayout from "../components/layout/newPageLayout";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useEffect, useState } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import "../styles/global.scss";
import "../styles/mycss.css";
import HeroPage from "../public/uploads/heroPage.svg";
import Image from "next/image";
import { Layout } from "antd";
import FooterComponent from "../components/layout/footer";
import toolkitStore, { useStore } from "../components/reducers/store";
import Loadingspinner from "../components/Loadingspinner";
import 'animate.css';


const { Header, Footer, Sider, Content } = Layout;

// import Footer from "../components/layout/footer";

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps?.initialReduxState);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isAdmin = router?.pathname === "/admin";
  console.log("isAdmin", isAdmin);
  const persistor = persistStore(store, {}, function () {
    persistor.persist();
  });

  
  return (
    <Provider store={store}>
      <Head>
        <link rel="icon" href="/wknd.png" type="image/png" />
        <title>The Weekenddoor - Villa Rentals & Occasion Bookings in Hyderabad, Telangana</title>
        <meta name="description" content="Your brief description about villa rentals and occasion bookings in Hyderabad, Telangana." />
        <link rel="canonical" href="https://theweekenddoor.com" />
        {/* Open Graph */}
        <meta property="og:title" content="The Weekenddoor - Villa Rentals & Occasion Bookings in Hyderabad, Telangana" />
        <meta property="og:description" content="Your brief description about villa rentals and occasion bookings in Hyderabad, Telangana." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://theweekenddoor.com" />
        <meta property="og:image" content="https://example.com/your-image.jpg" />
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="The Weekenddoor - Villa Rentals & Occasion Bookings in Hyderabad, Telangana" />
        <meta name="twitter:description" content="Your brief description about villa rentals and occasion bookings in Hyderabad, Telangana." />
        <meta name="twitter:image" content="https://example.com/your-image.jpg" />

        <link
          href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700,800,900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Playfair+Display:400,400i,500,500i,600,600i,700,700i&display=swap"
          rel="stylesheet"
        />

        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />

        <link rel="stylesheet" href="css/animate.css" />

        <link rel="stylesheet" href="css/owl.carousel.min.css" />
        <link rel="stylesheet" href="css/owl.theme.default.min.css" />
        <link rel="stylesheet" href="css/magnific-popup.css" />

        <link rel="stylesheet" href="css/bootstrap-datepicker.css" />
        <link rel="stylesheet" href="css/jquery.timepicker.css" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Vina Sans"
        />
         <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Montserrat"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Pacifico"
        />
        <link rel="stylesheet" href="css/flaticon.css" />
        <link rel="stylesheet" href="css/style.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Condensed&family=Roboto:wght@300&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/cloudinary-core/2.14.0/cloudinary-core-shrinkwrap.min.js"></script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"/>
      </Head>
      <PersistGate timeout={500} loading={<Loadingspinner/>} persistor={persistor}>
        <DndProvider backend={HTML5Backend}>
          <NewPageLayout>
            {pageProps && <Component {...pageProps} />}
          </NewPageLayout>
        </DndProvider>
      </PersistGate>
    {!isAdmin &&  <Footer><FooterComponent/></Footer>}

    </Provider>
  );
}

export default MyApp;
