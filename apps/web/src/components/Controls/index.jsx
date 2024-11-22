import PropTypes from "prop-types";
import { BsFullscreen, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { LiaSearchMinusSolid, LiaSearchPlusSolid } from "react-icons/lia";

export const Controls = ({
  className,
  onPrev,
  onNext,
  onZoomIn,
  onZoomOut,
  onToggleFullscreen,
}) => {
  return (
    <div
      className={`flex items-center gap-8 py-3 px-6 bg-white rounded-3xl ${className}`}>
      <button onClick={onPrev} aria-label="Previous Image">
        <BsChevronLeft size="24" />
      </button>
      <button onClick={onZoomIn} aria-label="Zoom In">
        <LiaSearchPlusSolid size="24" />
      </button>
      <button onClick={onZoomOut} aria-label="Zoom Out">
        <LiaSearchMinusSolid size="24" />
      </button>
      <button onClick={onNext} aria-label="Next Image">
        <BsChevronRight size="24" />
      </button>
      <button onClick={onToggleFullscreen} aria-label="Toggle Fullscreen">
        <BsFullscreen size="24" />
      </button>
    </div>
  );
};

Controls.propTypes = {
  className: PropTypes.string,
  onPrev: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onZoomIn: PropTypes.func.isRequired,
  onZoomOut: PropTypes.func.isRequired,
  onToggleFullscreen: PropTypes.func.isRequired,
};
