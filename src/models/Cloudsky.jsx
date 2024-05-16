/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useGLTF } from "@react-three/drei";
import skyScene from '../assets/3d/sifiSky.glb';
import { useRef, useEffect, useCallback } from "react";
import { useThree } from "@react-three/fiber";
import { throttle } from 'lodash';

const Cloudsky = ({ isRotating }) => {
  const sky = useGLTF(skyScene);
  const skyRef = useRef();
  const wheelSensitivity = 0.0001; // Adjust this value to control the wheel sensitivity
  const { gl } = useThree();
  const rotationSpeed = useRef(0);
  const dumpingFactor = 0.95;

  // Throttle the wheel event handler
  const handleWheel = useCallback(throttle((e) => {
    e.stopPropagation();
    e.preventDefault();
    const delta = e.deltaY * wheelSensitivity; // Adjust the multiplier for sensitivity
    skyRef.current.rotation.y += delta * Math.PI;
    rotationSpeed.current = delta * Math.PI;
  }, 100), []); // Adjust the throttle delay (100ms here)

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("wheel", handleWheel); // Add wheel event listener

    return () => {
      canvas.removeEventListener("wheel", handleWheel); // Remove wheel event listener
    };
  }, [gl, handleWheel]);

  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      if (isRotating) {
        skyRef.current.rotation.y += 0.01; // Adjust rotation speed as needed
      } else {
        rotationSpeed.current *= dumpingFactor;
        if (Math.abs(rotationSpeed.current) < 0.001) {
          rotationSpeed.current = 0;
        }
        skyRef.current.rotation.y += rotationSpeed.current;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [isRotating]);

  return (
    <mesh ref={skyRef} scale={[8, 8, 8]}>
      <primitive object={sky.scene} />
    </mesh>
  );
}

export default Cloudsky;
