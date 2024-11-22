import { ARROW_LEFT, ARROW_RIGHT } from "@/constant";
import { getImageUrls } from "@/utils";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { SpriteObject } from "../SprinteObject";
import { Controls } from "../Controls";
import { ZoomCamera } from "../CameraZoom";

export const SpriteScene = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(90);
  const images = getImageUrls("/r3", "Image", 40);
  const mouseStartX = useRef(null);
  const isDragging = useRef(false);

  const handlePrev = () => {
    setImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleNext = () => {
    setImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.max(prev - 5, 10));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.min(prev + 5, 100));
  };

  const handleToggleFullscreen = () => {
    console.log("Toggle Fullscreen");
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === ARROW_LEFT) {
        setImageIndex((prevIndex) =>
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      } else if (event.key === ARROW_RIGHT) {
        setImageIndex((prevIndex) =>
          prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
      }
    };

    const handleMouseDown = (event) => {
      if (event.button === 0) {
        mouseStartX.current = event.clientX;
        isDragging.current = true;
      }
    };

    const handleMouseMove = (event) => {
      if (!isDragging.current || mouseStartX.current === null) return;

      const deltaX = event.clientX - mouseStartX.current;

      const changeThreshold = 10;
      if (Math.abs(deltaX) > changeThreshold) {
        setImageIndex((prevIndex) => {
          const newIndex =
            deltaX > 0
              ? (prevIndex - 1 + images.length) % images.length
              : (prevIndex + 1) % images.length;
          return newIndex;
        });

        mouseStartX.current = event.clientX;
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [imageIndex, images.length]);

  useEffect(() => {
    const handleWheel = (event) => {
      // Check the scroll direction and adjust zoom level
      setZoomLevel((prevZoomLevel) => {
        if (event.deltaY < 0) {
          // Scrolling up: Zoom in
          return Math.max(prevZoomLevel - 5, 10);
        } else {
          // Scrolling down: Zoom out
          return Math.min(prevZoomLevel + 5, 100);
        }
      });
    };
  
    // Add wheel event listener
    window.addEventListener("wheel", handleWheel);
  
    return () => {
      // Cleanup the event listener
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <Canvas  style={{ width: "100%", height: "100%" }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <ZoomCamera zoomLevel={zoomLevel} />
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1, 0]}
          visible={false}>
          <planeGeometry args={[10, 10]} />
          <meshStandardMaterial color="lightblue" />
        </mesh>

        <SpriteObject image={images[imageIndex]} position={[0, 0, 0]} />
      </Canvas>
      <Controls
        className="absolute -translate-x-1/2 left-1/2 bottom-4"
        onPrev={handlePrev}
        onNext={handleNext}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onToggleFullscreen={handleToggleFullscreen}
      />
    </div>
  );
};
