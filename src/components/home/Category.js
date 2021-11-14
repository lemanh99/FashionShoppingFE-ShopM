import Link from "next/dist/client/link";
import { useSelector } from "react-redux";
export const Category1 = () => {
  const category = useSelector((state) => state.home.category_1);
  return (
    <div className="category-lineup-area pb-45">
      <div className="container">
        <div className="row">
          <div className="col-xxl-12 col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
            <div className="category-lineup">
              <h2>Category Lineup</h2>
            </div>
          </div>
          <div className="category-wrapper category-wrapper1 mt-15">
            <div className="row">
              {category &&
                category.map((category, i) => (
                  <div
                    className="col-xxl-2 col-xl-2  col-lg-2  col-md-4  col-sm-4 col-12"
                    key={i}
                  >
                    <div className="category-widget mb-50">
                      <h5 className="title position-relative d-inline-block hvr mb-25">
                        {category.title}
                      </h5>
                      <ul>
                        {category &&
                          category.menus.map((menu, i) => (
                            <li key={i}>
                              <Link href="/shop">
                                <a>{menu}</a>
                              </Link>
                            </li>
                          ))}
                      </ul>
                    </div>
                    {/* /category-widget */}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Category2 = ({ color, position }) => {
  const category = useSelector((state) => state.home.category_2);

  return (
    <div className="product-category-area product-category-area3 hm3 wow fadeInUp  animated">
      <div
        className={` hm2 ${
          position ? `product-category-bg ${position}` : "product-category-area"
        }`}
      >
        <div className="container">
          <ul className="product-category-active h2-gray-border10 pt-15 pb-45 d-xl-flex align-items-center justify-content-between">
            {category &&
              category.map((category, i) => (
                <li
                  className="single-product-category position-relative text-center d-inline-block mt-25"
                  key={i}
                >
                  <Link href="/shop">
                    <a
                      className={`${
                        color ? color : "h2-theme-color"
                      } line-height-1`}
                    >
                      <span>
                        <i className={`fal fa-${category.icon}`} />
                      </span>
                    </a>
                  </Link>
                  <h5 className="mt-10">{category.name}</h5>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
