import { useThree } from "@react-three/fiber";
import PropTypes from "prop-types";
import { useEffect } from "react";

export const ZoomCamera = ({ zoomLevel }) => {
  const { camera } = useThree();

  useEffect(() => {
    camera.fov = zoomLevel;
    camera.updateProjectionMatrix();
  }, [zoomLevel, camera]);

  return null;
};

ZoomCamera.propTypes = {
  zoomLevel: PropTypes.number.isRequired,
};
