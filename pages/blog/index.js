import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Blog from "../../src/components/blog/Blog";
import Paggination from "../../src/components/Paggination";
import Layout from "../../src/layout/Layout";
import PageBanner from "../../src/layout/PageBanner";
import { getBlog } from "../../src/redux/action/blog";
import { dblock } from "../../src/utils/utils";

const Blogs = ({ getBlog, blogs }) => {
  useEffect(() => {
    getBlog();
  }, []);
  const [active, setActive] = useState(0);
  const sort = 6;
  return (
    <Layout>
      <PageBanner title="Blog" />
      <div className="blog-area pt-120 ">
        <div className="container">
          <div className="row">
            {blogs &&
              blogs.map((blog, i) => (
                <div
                  className={`col-xl-4  col-lg-4  col-md-4  col-sm-12 col-12 plr-20 ${dblock(
                    active,
                    i,
                    sort
                  )}`}
                  key={blog.id}
                >
                  <Blog blog={blog} />
                </div>
              ))}
          </div>
        </div>
      </div>
      <Paggination
        active={active}
        setActive={setActive}
        sort={sort}
        length={blogs && blogs.length}
      />
    </Layout>
  );
};
const mapStateToProps = (state) => ({
  blogs: state.blog.blogs,
});

export default connect(mapStateToProps, { getBlog })(Blogs);
