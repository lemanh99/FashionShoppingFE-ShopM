import Link from "next/dist/client/link";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import { getTestimonial } from "../redux/action/home";
import Reating from "./Reating";
import { toast } from "react-hot-toast";
import axiosIntance from "../helpers/axios";

const Subscribe = ({ getTestimonial, testimonial, bg, inputBg }) => {
  useEffect(() => {
    getTestimonial();
  }, []);
  const [email, setEmail] = useState("")
  const [checked, setChecked] = useState(false)

  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (checked) {
      axiosIntance.post('feedback/subscribe', {email: email}).then((res) => {
        if (res.status == 200) {
          setEmail("");
          setChecked(false);
          toast.success("Đăng ký nhận khuyến mãi thành công")
        }else{
          toast.error("Đã xảy ra lỗi, vui lòng thử lại, cảm ơn!")
        }
      })
    } else {
      toast.error("Vui lòng đồng xem và đồng ý điều khoản")
    }

  }

  return (
    <div className="">
      <div className="section-title mb-30">
        <h4 className="light-black-color2 pb-1 font300">
          Đăng ký thông báo
        </h4>
        <p className="light-black-color7 font300">
          Nhận thông báo ưu đãi mới nhất của cửa hàng
        </p>
      </div>
      {/* /section-title */}
      <div className="subscribe-form-area subscribe-form-area1">
        <form onSubmit={(e) => handleSubscribe(e)}>
          <div className="d-sm-flex align-items-center">
            <div className="subscribe-info position-relative mr-6 mb-15">
              <input
                className={`sub-name form-control border-0 pl-35 ${inputBg
                  ? inputBg
                  : "h2-theme-color h2-light-black-bg3"
                  } rounded-0`}
                type="email"
                name="name"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="n-sub-name"
                placeholder="Nhập địa chỉ email"
              />
            </div>
            <div className="subscribe-btn mb-15">
              <div className="d-inline-block">
                <button type="submit"
                  className={`web-btn  d-inline-block rounded-0 text-capitalize white ${bg ? bg : "h2-theme-border1 h2-theme-bg"
                    } position-relative over-hidden pl-35 pr-35 ptb-12`}
                >
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
          <div className="save-info d-flex mb-15 align-items-center">
            <input
              className="p-0 mr-10 mt-3-px"
              type="checkbox"
              aria-label="Checkbox for following text input"
              value={checked}
              onChange={(e) => { setChecked(!checked) }}
            />
            <p className="mb-0 cursor-pinter light-black-color7">
              Tôi đồng ý với
              <Link href="/terms-and-condition">
                <a className="light-black-color7 line-height-1 mx-1" style={{ color: '#6199e0' }}>
                  Điều khoản &amp; điều kiện
                </a>
              </Link>
              và
              <Link href="/privacy-page">
                <a className="light-black-color7 line-height-1 ms-1" style={{ color: '#6199e0' }}>
                  chính sách
                </a>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  testimonial: state.home.testimonial,
});

export default connect(mapStateToProps, { getTestimonial })(Subscribe);
