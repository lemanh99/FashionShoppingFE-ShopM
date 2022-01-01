import Slider from "react-slick";

export const DoubleSlider = ({ children, extraClass }) => {
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    rows: 2,
    mobileFirst: true,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 0,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
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
export const SliderWithAutoPlay = ({ children, extraClass }) => {
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
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
export const SliderWithAutoPlayHome2 = ({ children, extraClass }) => {
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 457,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
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

export const SliderWithAutoPlayNumberShow = ({ children, extraClass, slidesToShow }) => {
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 457,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
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

export const SliderWithAutoPlayTwoRows = ({ children, extraClass, rows }) => {
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    rows: rows?rows:2,
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

export const SliderWithAutoPlayImplement = ({ children, extraClass }) => {
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    rows: 2,
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