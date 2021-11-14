import { useEffect, useState } from "react";
const ScrollTop = () => {
  const [scrollTop, setScrollTop] = useState(false);
  const [className, setClassName] = useState("");
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let path = window.location.pathname;
    switch (path) {
      case "/":
        setClassName("theme-bg");
        break;
      case "/index-3":
        setClassName("h3-theme-bg");
        break;
      default:
        setClassName("h2-theme-bg");
        break;
    }
  });

  const handleScroll = () => {
    let offset = window.scrollY;
    const sticky = document.getElementById("scroll");
    if (sticky) {
      if (offset > 300) {
        setScrollTop(true);
      } else {
        setScrollTop(false);
      }
    }
  };

  return (
    <div
      id="scroll"
      style={{
        display: scrollTop ? "" : "none",
      }}
    >
      <a
        href="#top"
        className={`${className} white d-block text-center position-fixed`}
      >
        <span className="icon-chevrons-up"></span>
      </a>
    </div>
  );
};

export default ScrollTop;
