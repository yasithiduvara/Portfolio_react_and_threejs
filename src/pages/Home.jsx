/* eslint-disable react/no-unknown-property */
 import { Canvas } from "@react-three/fiber"
import { Suspense, useState } from "react"
import Loader from "../components/Loader"
// import Island from "../models/Island"
import FoxIsland from "../models/FoxIsland"
import Cloudsky from "../models/Cloudsky"
import Bird from "../models/Bird"
import Plane from "../models/Plane"
import Island from "../models/Island"

 
 {/* <div className=" absolute top-28 left-0 right-0 z-10 flex items-center justify-center">
        POPUP
      </div> */}

const Home = () => {

  const [isRotating, setIsRotating] = useState(false);
  
  const adjustIslandForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [3, 3, 3];
      screenPosition = [0, -6.5, -43.4];
    } else {
      screenScale = [1, 1, 1];
      screenPosition = [0, -6.5, -43.4];
    }

    return [screenScale, screenPosition];
  };

  const adjustPlaneForScreenSize = () => {
    let screenScale, screenPosition;

    if (window.innerWidth < 768) {
      screenScale = [1.5, 1.5, 1.5];
      screenPosition = [0, -1.5, 0];

     
    } else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4];
    }

    return [screenScale, screenPosition];
  };

  const [islandScale, islandPosition] = adjustIslandForScreenSize();
  const [planeScale, planePosition] = adjustPlaneForScreenSize();


  return (
    <section className="w-full h-screen relative bg-blue-900">
     <Canvas 
        className={`w-full h-screen bg-transparent ${isRotating ? 'cursor-grabbing': 'cursor-grab'}`}
        camera={{near: 0.1, far: 1000}}>
      
      <Suspense fallback={<Loader />}>
          <directionalLight position={[1,1,1]} intensity={5}/>
          <ambientLight intensity={0.8}/>
          {/* <pointLight /> */}
          <hemisphereLight skyColor="#b1e1ff" graoundColor="#fff"/>

          {/* <Island 
           position={islandPosition}
           rotation={[0.1, 4.7077, 0]}
           scale={islandScale}
           isRotating={isRotating}
           setIsRotating={setIsRotating}
            />  */}

          <Bird />
          <Cloudsky />
          <FoxIsland 
          position={islandPosition}
          rotation={[11.1, 6.3, 38]}
          scale={islandScale}
          isRotating={isRotating}
          setIsRotating={setIsRotating}
          />
          <Plane
            isRotating={isRotating}
            position={planePosition}
            scale={planeScale}
            rotation={[0,20,0]}
           />
      </Suspense>

     </Canvas>

    </section>
  )
}

export default Home