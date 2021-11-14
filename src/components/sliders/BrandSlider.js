import { useEffect } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { getBrand } from "../../redux/action/home";

const BrandSlider = ({ getBrand, brand }) => {
  useEffect(() => {
    getBrand();
  }, []);
  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1320,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 475,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="brand-logo-area bg-white over-hidden">
      <div className="container border-t-gray pt-55 pb-55">
        <div className="mlr--55">
          <Slider
            {...settings}
            className="row brand-active d-flex align-items-center "
          >
            {brand &&
              brand.map((b, i) => (
                <div className="text-center" key={i}>
                  <a href="#" className="d-block">
                    <img className="d-inline-block" src={b} alt="Brand" />
                  </a>
                </div>
              ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  brand: state.home.brand,
});

export default connect(mapStateToProps, { getBrand })(BrandSlider);
