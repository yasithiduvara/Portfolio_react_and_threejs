/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
import { useGLTF } from "@react-three/drei"
import skyScene from '../assets/3d/sifiSky.glb'
import { useRef } from "react"
import { useFrame } from "@react-three/fiber";

const Cloudsky = ({ isRotating }) => {
  const sky = useGLTF(skyScene);
  const skyRef = useRef();

  useFrame((_, delta) => {
    if(isRotating) {
      skyRef.current.rotation.y += 0.5 * delta
    }
  })

  return (
    <mesh ref={skyRef} scale={[8, 8, 8]}>
        <primitive object={sky.scene} />
    </mesh>
  )
}

export default Cloudsky