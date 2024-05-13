/* eslint-disable no-unused-vars */

import ImageCarosle from "./ImageCarosle"

const renderContent = {
    1: (
        <h1>Hello</h1>
    ),
    2: (
        <div>
            <ImageCarosle />
        </div>
    ),
    3: (
        <h1>3</h1>
    ),
    4: (
        <h1>4</h1>
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