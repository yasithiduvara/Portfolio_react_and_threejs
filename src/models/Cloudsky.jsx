/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useGLTF } from "@react-three/drei";
import skyScene from '../assets/3d/sky.glb';
import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";

const Cloudsky = ({ isRotating }) => {
  const sky = useGLTF(skyScene);
  const skyRef = useRef();
  const rotationSpeed = useRef(0);
  const dumpingFactor = 0.95;
  const wheelSensitivity = 0.0001; // Adjust this value to control the wheel sensitivity
  const { gl } = useThree();


  const handleWheel = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const delta = e.deltaY * wheelSensitivity; // Adjust the multiplier for sensitivity
    skyRef.current.rotation.y += delta * Math.PI;
    rotationSpeed.current = delta * Math.PI;
  };

  useFrame((_, delta) => {
    if (isRotating) {
      skyRef.current.rotation.y += 0.5 * delta;
    } else {
      rotationSpeed.current *= dumpingFactor;
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }
      skyRef.current.rotation.y += rotationSpeed.current;
    }
  });

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("wheel", handleWheel); // Add wheel event listener

    return () => {
      canvas.removeEventListener("wheel", handleWheel); // Remove wheel event listener
    };
  }, [gl]);

  return (
    // <mesh ref={skyRef} >
    //     <primitive object={sky.scene} />
    // </mesh>
    <mesh ref={skyRef} scale={[8, 8, 8]}>
        <primitive object={sky.scene} />
    </mesh>
  )
}

export default Cloudsky