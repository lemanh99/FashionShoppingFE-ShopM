import { useEffect } from "react";
import Slider from "react-slick";
import { dataImage } from "../../utils/utils";
export const HomePageSliderWithOutArrow = ({
  sliders,
  children,
  extraClass,
}) => {
  useEffect(() => {
    dataImage();
  }, [sliders]);

  var settings = {
    autoplay: false,
    autoplaySpeed: 10000,
    dots: false,
    fade: true,
    cssEase: "linear",
    arrows: false,
  };
  return (
    <Slider
      className={`${extraClass ? extraClass : "slider-active"}`}
      {...settings}
    >
      {children}
    </Slider>
  );
};
