/* eslint-disable react/no-unknown-property */
import birdScene from '../assets/3d/plane.glb'
import { useGLTF  } from '@react-three/drei'

const Plane = ({isRotating, ...props}) => {
    const {scene, animations} = useGLTF(birdScene);
    return (
      <mesh {...props}>
        <primitive object={scene} />
      </mesh>
)
}

export default Plane