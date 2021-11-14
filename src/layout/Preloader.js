import { useEffect, useState } from "react";

const Preloader = () => {
  const [className, setClassName] = useState("");

  useEffect(() => {
    let path = window.location.pathname;
    switch (path) {
      case "/":
        setClassName("home1");
        break;
      case "/index-3":
        setClassName("home3");
        break;
      default:
        setClassName("loderDefault");
        break;
    }
  });

  return (
    <div id="loading" className={className}>
      <div id="loading-center">
        <div id="loading-center-absolute">
          <div className="object" id="object_one"></div>
          <div className="object" id="object_two"></div>
          <div className="object" id="object_three"></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
