/* eslint-disable no-unused-vars */

import ImageCarosle from "./ImageCarosle"

const renderContent = {
    1: (
        <h1 className="text-white">Hello</h1>
    ),
    2: (
        <div className="text-white">
            <ImageCarosle />
        </div>
    ),
    3: (
        <h1 className="text-white">3</h1>
    ),
    4: (
        <h1 className="text-white">4</h1>
    )
}

const infoBOx = ({ text,link, btnText }) => (
   <div>
    
   </div> 
)

const HomeInfo = ({ currentStage }) => {
  return renderContent[currentStage] || null
}

export default HomeInfo