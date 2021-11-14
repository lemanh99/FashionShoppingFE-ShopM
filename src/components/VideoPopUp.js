import { Fragment } from "react";

const VideoPopUp = ({ closePopup, video }) => {
  return (
    <Fragment>
      <div className="mfp-bg mfp-ready" onClick={() => closePopup()}></div>
      <div
        className="mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-ready"
        tabIndex={-1}
        style={{ overflow: "hidden auto" }}
      >
        <div className="mfp-container mfp-s-ready mfp-iframe-holder">
          <div className="mfp-content">
            <div className="mfp-iframe-scaler">
              <button
                title="Close (Esc)"
                type="button"
                className="mfp-close"
                onClick={() => closePopup()}
              >
                ×
              </button>
              <iframe
                src={
                  video
                    ? video
                    : "https://www.youtube.com/embed/mAd3WGuBoeI?autoplay=1"
                }
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              />
            </div>
          </div>
          <div className="mfp-preloader">Loading...</div>
        </div>
      </div>
    </Fragment>
  );
};

export default VideoPopUp;
