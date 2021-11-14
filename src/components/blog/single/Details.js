import Link from "next/dist/client/link";
import { Fragment } from "react";
import Slider from "react-slick";

const Details = ({ blog }) => {
  const Arrow = ({ icon, onClick, className, text }) => {
    const ClickEvent = () => {
      onClick();
    };
    return (
      <b className={className} onClick={ClickEvent}>
        <span className={`${text}-a`}>
          <i className={icon}></i>
        </span>
      </b>
    );
  };
  let settings = {
    dots: false,
    arrows: true,
    prevArrow: Arrow({ icon: "fas fa-angle-left", text: "l" }),
    nextArrow: Arrow({ icon: "fas fa-angle-right", text: "r" }),
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    mobileFirst: true,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <Fragment>
      <div className="row">
        <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
          <div className="blog-content pr-50">
            <Link href={`/blog/${blog && blog.id}`}>
              <a className="d-block mb-30">
                <img
                  src={blog && blog.thumbnail}
                  alt="Blog Image"
                  className="w-100"
                />
              </a>
            </Link>
            <h3 className="font600 light-black-color3 pb-15">
              {blog && blog.title}
            </h3>
            <p>
              sit amet consectetur adipisicing elit. A placeat, sint ab non
              ratione eligendi qui facilis numquam magnam eius iusto perferendis
              minima molestiae perspiciatis laborum saepe quo consectetur
              aliquid!
            </p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius in
              ipsam ratione facere vero iste repudiandae beatae quasi, voluptate
              mollitia iusto harum error reiciendis eligendi molestiae eum?
              Assumenda nesciunt odio, maxime ratione sint possimus quae,
              numquam laborum cum, voluptatem, aliquam obcaecati excepturi
              quidem ex praesentium commodi aperiam quis non voluptates iusto
              distinctio doloribus enim necessitatibus! Quae vel alias sequi?
            </p>
            <p>
              velit veritatis voluptate ratione earum odio, porro, iste
              explicabo optio , hic voluptas eligendi cupiditate, itaque ab quas
              eveniet maiores in officiis aspernatur incidunt consequatur
              laboriosam quibusdam. Nesciunt possimus qui incidunt distinctio
              cumque?.
            </p>
            <blockquote className="blockquote mb-30">
              <p className="mb-0">
                Web pageMany desktop publishing packages and web page editors
                now use Lorem Ipsum as their default model text, and a search
                for ‘lorem ipsum’ will uncover many web sites still in their
                infancy.Ipsum as their default model Ipsum as their default
                model. will uncover many web sites still in their infancy
              </p>
            </blockquote>
          </div>
          <div className="blog-content blog-content2 pr-50 mt--15">
            <div className="blog-content-img mb-4">
              <Slider {...settings} className="blog-details-img-active">
                {blog &&
                  blog.images &&
                  blog.images.map((img, i) => (
                    <a href="#" key={i}>
                      <img className="width100" src={img} alt="Blog" />
                    </a>
                  ))}
              </Slider>
              {/* /row */}
            </div>
            <p className="mt--15">
              eaque similique enim quibusdam officiis non pariatur aspernatur
              odit tempora rerum dolorem veritatis. Voluptas, natus
              molestias.Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Vitae error quaerat corporis, incidunt et ipsa omnis amet?
              Voluptatum quae amet doloribus perferendis necessitatibus Lorem
              ipsum dolor sit amet consectetur, adipisicing elit. Vitae error
              quaerat corporis, incidunt et ipsa omnis amet? Voluptatum quae
              amet doloribus perferendis necess esse a! Quo, ipsa! Ipsa suscipit
              laudantium facilis, sunt minus,ipsum dolor sit amet consectetur,
              adipisicing elit. Vitae error quaerat corporis, incidunt et ipsa
              om.{" "}
            </p>
          </div>
          <div className="blog-footer blog-content pr-50 d-sm-flex justify-content-between pt-50">
            <ul className="post-tag pb-20">
              {blog &&
                blog.tags &&
                blog.tags.map((tag, i) => (
                  <li className="d-inline-block pr-6" key={i}>
                    <a
                      className="light-black-color2 border-gray1 d-block mr-1 hvr2"
                      href="#"
                    >
                      {tag}
                    </a>
                  </li>
                ))}
            </ul>
            <ul className="social-link pb-20 d-flex align-items-center">
              <li className="mr-1">
                <a className="text-white fb-bg d-block" href="#">
                  <i className="fab fa-facebook-f" />
                </a>
              </li>
              <li className="mr-1">
                <a className="text-white tw-bg d-block" href="#">
                  <i className="fab fa-twitter" />
                </a>
              </li>
              <li className="mr-1">
                <a className="text-white lnkd-bg d-block" href="#">
                  <i className="fab fa-linkedin-in" />
                </a>
              </li>
              <li>
                <a className="text-white gg-bg d-block" href="#">
                  <i className="fab fa-google-plus-g" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Details;
