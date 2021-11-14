import { useEffect } from "react";
import { connect } from "react-redux";
import { getBlog } from "../../redux/action/blog";
import { filterBlog } from "../../utils/filterBlog";
import Blog from "./Blog";

const HomePageBlog = ({ getBlog, blogs, leftHeading }) => {
  useEffect(() => {
    getBlog();
  }, []);
  return (
    <div className="blog-area pb-20">
      <div className="container">
        <div className="row">
          <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
            <div
              className={`section-title ${leftHeading ? "" : "text-center"}`}
            >
              <h3 className="font-pt light-black-color2 pb-1">
                Latest News &amp; Blog
              </h3>
              <p className="light-black-color7 font300">
                Sed ut perspiciatis undeous omniiste natusing error
              </p>
            </div>
          </div>
        </div>
        <div className="row news-post-active">
          {blogs &&
            blogs.map((blog) => (
              <div
                className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-12"
                key={blog.id}
              >
                <Blog blog={blog} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  blogs: filterBlog("home", state.blog.blogs),
});

export default connect(mapStateToProps, { getBlog })(HomePageBlog);
