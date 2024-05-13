/* eslint-disable react/no-unknown-property */
import { useGLTF } from "@react-three/drei"
import skyScene from '../assets/3d/cloud.glb'

const Cloudsky = () => {
  const sky = useGLTF(skyScene)
  return (
    <mesh>
        <primitive object={sky.scene} />
    </mesh>
  )
}

export default Cloudsky