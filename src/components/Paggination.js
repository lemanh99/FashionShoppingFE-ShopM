const Paggination = ({ setActive, active, length, sort }) => {
  // console.log(active, sort);
  const page_number = 15;
  const arrayNumber = (a, b) => {
    var foo = [];

    for (var i = a; i < b; i++) {
      foo.push(i);
    }
    return foo;
  }
  const max_length = Math.ceil(length / sort)
  const number_current = Math.floor((active+1)/15)
  const first = number_current>0?15*(number_current)-1:15*(number_current);
  const last = 15*number_current+15<max_length?15*number_current+15:max_length
  const arrayList = arrayNumber(first, last)
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
                {arrayList
                  .map((m, i) => (
                    <li
                      key={m}
                      className={`page-item ${active === m ? "active" : ""}`}
                    >
                      <a
                        className="page-link"
                        href="#"
                        onClick={(e) => {
                          setActive(m);
                          e.preventDefault();
                        }}
                      >
                        {m < 9 ? `0${m + 1}` : m + 1}
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
