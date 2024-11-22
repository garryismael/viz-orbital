import { useLoader } from "@react-three/fiber";
import PropTypes from "prop-types";
import { TextureLoader } from "three";

export const SpriteObject = ({ image, position }) => {
  const texture = useLoader(TextureLoader, image);

  const aspectRatio = texture.image.width / texture.image.height;

  const scaleHeight = 10;
  const scaleWidth = scaleHeight * aspectRatio;

  return (
    <sprite position={position} scale={[scaleWidth, scaleHeight, 1]}>
      <spriteMaterial attach="material" map={texture} />
    </sprite>
  );
};

SpriteObject.propTypes = {
  image: PropTypes.string,
  position: PropTypes.array,
};

