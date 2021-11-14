import { useRouter } from "next/router";
import { useEffect } from "react";
import { connect } from "react-redux";
import Comment from "../../src/components/blog/single/Comment";
import Details from "../../src/components/blog/single/Details";
import Right from "../../src/components/blog/single/Right";
import Layout from "../../src/layout/Layout";
import PageBanner from "../../src/layout/PageBanner";
import { getSingleBlog } from "../../src/redux/action/blog";

const SingleBlog = ({ blog, getSingleBlog, blogs }) => {
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    getSingleBlog(id);
  }, [id]);

  return (
    <Layout>
      {/* <PageBanner title="Blog Details" pageName="Blog Details" /> */}
      {blog ? (
        <div className="blog-details-area mt-100 mb-100">
          <div className="container">
            <div className="product-wrapper">
              <div className="row">
                <div className="col-xl-9  col-lg-9  col-md-12  col-sm-12 col-12">
                  <Details blog={blog} />
                  <Comment />
                </div>
                <div className="col-xl-3  col-lg-3  col-md-12  col-sm-12 col-12 pl-0">
                  <Right blogs={blogs} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2 className="text-center mt-100 mb-100">Blog Not Found</h2>
      )}
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  blog: state.blog.singleBlog,
  blogs: state.blog.blogs,
});

export default connect(mapStateToProps, { getSingleBlog })(SingleBlog);
