import Link from "next/dist/client/link";
const Blog = ({ blog }) => {
  return (
    <div className="single-blog mb-30">
      <div className="blog-img position-relative transition-3 mt-25">
        <div className=" over-hidden">
          <Link href={`/blog/${blog.id}`}>
            <a>
              <img className="img-zoom" src={blog.thumbnail} alt="Blog Image" />
            </a>
          </Link>
          <div className="blog-shadow position-absolute transition-5 light-theme-bg" />
          <div className="date position-absolute left-0 bottom-0 d-flex mb-20 ml-30">
            <a
              href="#"
              className="web-btn border-white01 d-inline-block text-capitalize white-bg theme-color position-relative over-hidden pl-35 pr-35 ptb-12"
            >
              {blog.date}
            </a>
          </div>
        </div>
      </div>

      <div className="single-blog-content position-relative transition-5 pt-3 pr-25 pb-40">
        <h5>
          <Link href={`/blog/${blog.id}`}>
            <a className="pb-15 d-block light-black-color2">{blog.title}</a>
          </Link>
        </h5>
        <p className="pb-1 light-black-color7">{blog.shortDec}</p>
        <Link href={`/blog/${blog.id}`}>
          <a className="border-b-white01 title primary-color2 font700 d-inline-block text-capitalize position-relative hvr">
            Read More
            <span className="pl-2d-inline-block">
              <span className="icon-chevron-right" />
            </span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Blog;
