const Paggination = ({ setActive, active, length, sort }) => {
  return length ? (
    <div className="pagination-area mt-20 mb-120 over-hidden">
      <div className="container position-relative">
        <div className="row">
          <div className="col-xl-12  col-lg-12  col-md-12  col-sm-12 col-12">
            <nav
              className="pagination-page"
              aria-label="Page navigation example"
            >
              <ul className="pagination align-items-center justify-content-center">
                <li className="page-item">
                  <a
                    className="page-link prev"
                    href="#"
                    onClick={(e) => {
                      setActive(0);
                      e.preventDefault();
                    }}
                  >
                    <i className="fas fa-angle-left me-1"></i>
                    Trước
                  </a>
                </li>
                {Array(Math.ceil(length / sort))
                  .fill("p")
                  .map((m, i) => (
                    <li
                      key={i}
                      className={`page-item ${active === i ? "active" : ""}`}
                    >
                      <a
                        className="page-link"
                        href="#"
                        onClick={(e) => {
                          setActive(i);
                          e.preventDefault();
                        }}
                      >
                        {i < 9 ? `0${i + 1}` : i + 1}
                      </a>
                    </li>
                  ))}

                <li className="page-item">
                  <a
                    className="page-link next"
                    href="#"
                    onClick={(e) => {
                      setActive(Array(Math.ceil(length / sort)).length - 1);
                      e.preventDefault();
                    }}
                  >
                    Sau <i className="fas fa-angle-right "></i>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Paggination;
