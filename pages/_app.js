import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import AllToaster from "../src/components/AllToaser";
import Preloader from "../src/layout/Preloader";
import ScrollTop from "../src/layout/ScrollTop";
import store from "../src/redux/store";
import { animationCreate, aTagClick, dataImage } from "../src/utils/utils";
import "../styles/main.css";
function MyApp({ Component, pageProps }) {
  const [preloader, setPreloader] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setPreloader(false);
    }, 1000);
    animationCreate();
    aTagClick();
    dataImage();
  });

  return (
    <Provider store={store}>
      <AllToaster />
      {preloader ? <Preloader /> : <ScrollTop />}
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
