/* eslint-disable react/prop-types */
/* eslint-disable no-const-assign */
/* eslint-disable react/no-unknown-property */

import { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import chainaBg from '../assets/3d/bg.glb'
import { a } from '@react-spring/three'

const ChinaH = ({isRotating, setIsRotating, setCurrentStage, ...props}) => {
const {gl, viewport} = useThree();
const chainaBgRef = useRef();
const { nodes, materials } = useGLTF(chainaBg)
const lastX = useRef(0);
const rotationSpeed = useRef(0);
const dumpingFactor = 0.95;
const wheelSensitivity = 0.0001;

const handlePointerDown = (e) => {
  e.stopPropagation();
  e.preventDefault();
  setIsRotating(true);

  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  lastX =  clientX;
}

const handlePointerUp = (e) => {
  e.stopPropagation();
  e.preventDefault();
  setIsRotating(false);

  
}

const handlePointerMove = (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (isRotating) {
      // If rotation is enabled, calculate the change in clientX position
      const clientX = event.touches ? event.touches[0].clientX : event.clientX;

      // calculate the change in the horizontal position of the mouse cursor or touch input,
      // relative to the viewport's width
      const delta = (clientX - lastX.current) / viewport.width;

      // Update the island's rotation based on the mouse/touch movement
      chainaBgRef.current.rotation.y += delta * 0.01 * Math.PI;

      // Update the reference for the last clientX position
      lastX.current = clientX;

      // Update the rotation speed
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  
}

// Handle keydown events
const handleKeyDown = (event) => {
  if (event.key === "ArrowLeft") {
    if (!isRotating) setIsRotating(true);

    chainaBgRef.current.rotation.y += 0.005 * Math.PI;
    rotationSpeed.current = 0.007;
  } else if (event.key === "ArrowRight") {
    if (!isRotating) setIsRotating(true);

    chainaBgRef.current.rotation.y -= 0.005 * Math.PI;
    rotationSpeed.current = -0.007;
  }
};

// Handle keyup events
const handleKeyUp = (event) => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    setIsRotating(false);
  }
};

// Touch events for mobile devices
const handleTouchStart = (e) => {
  e.stopPropagation();
  e.preventDefault();
  setIsRotating(true);

  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  lastX.current = clientX;
}

const handleTouchEnd = (e) => {
  e.stopPropagation();
  e.preventDefault();
  setIsRotating(false);
}

// Handle wheel events
const handleWheel = (e) => {
    e.stopPropagation();
    e.preventDefault();
   // e.deltaY is positive when scrolling down, negative when scrolling up
  const delta = e.deltaY * wheelSensitivity; // Adjust the multiplier for sensitivity
  chainaBgRef.current.rotation.y += delta * Math.PI;
  rotationSpeed.current = delta * Math.PI;
  };
  

const handleTouchMove = (e) => {
  e.stopPropagation();
  e.preventDefault();

  if (isRotating) {
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const delta = (clientX - lastX.current) / viewport.width;

    chainaBgRef.current.rotation.y += delta * 0.01 * Math.PI;
    lastX.current = clientX;
    rotationSpeed.current = delta * 0.01 * Math.PI;
  }
}

useFrame(() => {
  if(!isRotating) {
    rotationSpeed.current *= dumpingFactor;

    if(Math.abs(rotationSpeed.current) < 0.001){
      rotationSpeed.current = 0;
    }

    chainaBgRef.current.rotation.y += rotationSpeed.current
  } else {
    const rotation = chainaBgRef.current.rotation.y;
    
      const normalizedRotation =
        ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

      // Set the current stage based on the island's orientation
      switch (true) {
        case normalizedRotation >= 5.45 && normalizedRotation <= 5.85:
          setCurrentStage(4);
          break;
        case normalizedRotation >= 0.85 && normalizedRotation <= 1.3:
          setCurrentStage(3);
          break;
        case normalizedRotation >= 2.4 && normalizedRotation <= 2.6:
          setCurrentStage(2);
          break;
        case normalizedRotation >= 4.25 && normalizedRotation <= 4.75:
          setCurrentStage(1);
          break;
        default:
          setCurrentStage(null);
      }
  }
})

useEffect(() => {
  const canvas = gl.domElement
  canvas.addEventListener("pointerdown", handlePointerDown);
  canvas.addEventListener("pointerup", handlePointerUp);
  canvas.addEventListener("pointermove", handlePointerMove);
  window.addEventListener("keydown", handleKeyDown);
  window.addEventListener("keyup", handleKeyUp);
  canvas.addEventListener("touchstart", handleTouchStart);
  canvas.addEventListener("touchend", handleTouchEnd);
  canvas.addEventListener("wheel", handleWheel); 
  canvas.addEventListener("touchmove", handleTouchMove);

  // Remove event listeners when component unmounts
  return () => {
    canvas.removeEventListener("pointerdown", handlePointerDown);
    canvas.removeEventListener("pointerup", handlePointerUp);
    canvas.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
    canvas.removeEventListener("touchstart", handleTouchStart);
    canvas.removeEventListener("touchend", handleTouchEnd);
    canvas.removeEventListener("wheel", handleWheel); // Add wheel event listener
    canvas.removeEventListener("touchmove", handleTouchMove);
  }
},[gl,handlePointerDown,handlePointerMove,handlePointerUp])



  return (
    <a.group ref={chainaBgRef} {...props} dispose={null}>
    <group position={[1.053, 0.206, 1.153]}>
      <mesh
        geometry={nodes.Object_14.geometry}
        material={materials.Wood_fence}
      />
      <mesh
        geometry={nodes.Object_15.geometry}
        material={materials.Wood_molding}
      />
    </group>
    <group position={[2.6, 1.325, -0.675]}>
      <mesh
        geometry={nodes.Object_90.geometry}
        material={materials.Leaves1}
        position={[-0.013, 0.238, 0.024]}
      />
    </group>
    <group position={[2.429, 0.229, -0.356]}>
      <mesh
        geometry={nodes.Object_93.geometry}
        material={materials.Leaves2}
        position={[-0.069, 0.045, -0.066]}
      />
    </group>
    <group position={[0.652, 0.437, -0.07]}>
      <mesh
        geometry={nodes.Object_99.geometry}
        material={materials.Wood_fence}
      />
      <mesh
        geometry={nodes.Object_100.geometry}
        material={materials.Wood_molding}
      />
    </group>
    <mesh
      geometry={nodes.Object_4.geometry}
      material={materials.Barrel}
      position={[0.587, 0.142, 1.65]}
    />
    <mesh
      geometry={nodes.Object_6.geometry}
      material={materials.Rocks}
      position={[0.684, 0.087, 1.006]}
    />
    <mesh
      geometry={nodes.Object_8.geometry}
      material={materials.Wood_fence}
      position={[0.66, 0.128, 0.971]}
    />
    <mesh
      geometry={nodes.Object_10.geometry}
      material={materials.Rocks}
      position={[0.398, 0.044, 1.188]}
    />
    <mesh
      geometry={nodes.Object_12.geometry}
      material={materials.Rocks}
      position={[1.714, 0.044, 1.134]}
    />
    <mesh
      geometry={nodes.Object_17.geometry}
      material={materials.Rocks}
      position={[1.816, 0.027, 1.112]}
    />
    <mesh
      geometry={nodes.Object_19.geometry}
      material={materials.Rocks}
      position={[0.303, 0.035, 1.202]}
    />
    <mesh
      geometry={nodes.Object_21.geometry}
      material={materials.Wood_fence}
      position={[1.046, 0.26, 1.155]}
    />
    <mesh
      geometry={nodes.Object_23.geometry}
      material={materials.Wood_fence}
      position={[1.064, 0.381, 1.151]}
    />
    <mesh
      geometry={nodes.Object_25.geometry}
      material={materials.Metal}
      position={[1.053, 0.337, 1.421]}
    />
    <mesh
      geometry={nodes.Object_27.geometry}
      material={materials.Tiles}
      position={[0.721, 0.354, 0.461]}
    />
    <mesh
      geometry={nodes.Object_29.geometry}
      material={materials.Wood_fence}
      position={[0.712, 0.114, 0.404]}
    />
    <mesh
      geometry={nodes.Object_31.geometry}
      material={materials.Walls}
      position={[0.721, 0.202, 0.467]}
    />
    <mesh
      geometry={nodes.Object_33.geometry}
      material={materials.Metal}
      position={[0.721, 0.354, 0.461]}
    />
    <mesh
      geometry={nodes.Object_35.geometry}
      material={materials.Metal}
      position={[-0.687, 0.476, 0.628]}
    />
    <mesh
      geometry={nodes.Object_37.geometry}
      material={materials.Bricks}
      position={[-0.187, 2.207, -0.421]}
    />
    <mesh
      geometry={nodes.Object_39.geometry}
      material={materials.Wood_molding}
      position={[-0.52, 0.533, 0.568]}
    />
    <mesh
      geometry={nodes.Object_41.geometry}
      material={materials.Wood_fence}
      position={[-0.533, 1.377, 0.625]}
    />
    <mesh
      geometry={nodes.Object_43.geometry}
      material={materials.Wood_molding}
      position={[-1.067, 0.92, -0.074]}
    />
    <mesh
      geometry={nodes.Object_45.geometry}
      material={materials.Smoke}
      position={[-0.189, 2.822, -0.503]}
    />
    <mesh
      geometry={nodes.Object_47.geometry}
      material={materials.Wood_molding}
      position={[-0.542, 1.629, -0.07]}
    />
    <mesh
      geometry={nodes.Object_49.geometry}
      material={materials.Wood_molding}
      position={[0.19, 1.075, -0.063]}
    />
    <mesh
      geometry={nodes.Object_51.geometry}
      material={materials.Wood_molding}
      position={[-0.543, 2.231, -0.069]}
    />
    <mesh
      geometry={nodes.Object_53.geometry}
      material={materials.Wood_molding}
      position={[-0.542, 0.773, -0.07]}
    />
    <mesh
      geometry={nodes.Object_55.geometry}
      material={materials.Wood_molding}
      position={[-0.542, 1.235, -0.07]}
    />
    <mesh
      geometry={nodes.Object_57.geometry}
      material={materials.Wood_molding}
      position={[-0.542, 1.376, 0.656]}
    />
    <mesh
      geometry={nodes.Object_59.geometry}
      material={materials.Wood_molding}
      position={[-1.044, 0.915, -0.062]}
    />
    <mesh
      geometry={nodes.Object_61.geometry}
      material={materials.Bricks}
      position={[-0.409, 0.02, -0.07]}
    />
    <mesh
      geometry={nodes.Object_63.geometry}
      material={materials.Bricks}
      position={[-0.542, 0.133, -0.07]}
    />
    <mesh
      geometry={nodes.Object_65.geometry}
      material={materials.Tiles}
      position={[-0.542, 1.919, -0.07]}
    />
    <mesh
      geometry={nodes.Object_67.geometry}
      material={materials.Tiles}
      position={[-0.542, 1.924, -0.07]}
    />
    <mesh
      geometry={nodes.Object_69.geometry}
      material={materials.Tiles}
      position={[0.205, 1.106, -0.062]}
    />
    <mesh
      geometry={nodes.Object_71.geometry}
      material={materials.Island}
      position={[0.735, -1.301, 0.447]}
    />
    <mesh
      geometry={nodes.Object_73.geometry}
      material={materials.Water}
      position={[1.013, -1.073, 0.42]}
    />
    <mesh
      geometry={nodes.Object_75.geometry}
      material={materials.House}
      position={[-0.435, 1.082, -0.07]}
    />
    <mesh
      geometry={nodes.Object_77.geometry}
      material={materials.Grass}
      position={[0.738, 0.03, 0.421]}
    />
    <mesh
      geometry={nodes.Object_79.geometry}
      material={materials.Rocks}
      position={[1.029, 0.028, 1.069]}
    />
    <mesh
      geometry={nodes.Object_81.geometry}
      material={materials.Metal}
      position={[-0.92, 0.998, 0.983]}
    />
    <mesh
      geometry={nodes.Object_83.geometry}
      material={materials.Metal}
      position={[-0.92, 0.945, 0.957]}
    />
    <mesh
      geometry={nodes.Object_85.geometry}
      material={materials.Wood_fence}
      position={[-0.92, 0.788, 0.976]}
    />
    <mesh
      geometry={nodes.Object_87.geometry}
      material={materials.Metal}
      position={[-0.92, 0.998, 0.666]}
    />
    <mesh
      geometry={nodes.Object_95.geometry}
      material={materials.Wood_stump}
      position={[2.6, 1.325, -0.675]}
    />
    <mesh
      geometry={nodes.Object_97.geometry}
      material={materials.Wood_stump}
      position={[2.429, 0.229, -0.356]}
    />
    <mesh
      geometry={nodes.Object_102.geometry}
      material={materials.Metal}
      position={[0.466, 0.437, -0.07]}
    />
    <mesh
      geometry={nodes.Object_104.geometry}
      material={materials.Wood_fence}
      position={[0.652, 0.439, -0.07]}
    />
    <mesh
      geometry={nodes.Object_106.geometry}
      material={materials.Wood_fence}
      position={[0.652, 0.437, -0.07]}
    />
    <mesh
      geometry={nodes.Object_108.geometry}
      material={materials.Wood_fence}
      position={[0.652, 0.437, -0.07]}
    />
    <mesh
      geometry={nodes.Object_110.geometry}
      material={materials.Metal}
      position={[0.765, 0.437, -0.07]}
    />
  </a.group>
  )
}


export default ChinaH;