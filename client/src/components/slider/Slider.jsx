import { useState } from "react"
import "src/components/slider/slider.scss"

import { FaAngleDoubleRight, FaAngleDoubleLeft ,FaTimes} from "react-icons/fa";


const Slider = ({ images }) =>{
  const [imageIndex, setImageIndex] = useState(null)

  const changeSlide = (direction) => {
    if (direction === "left") {
      if (imageIndex === 0) {
        setImageIndex(images.length - 1)
      } else {
        setImageIndex(imageIndex - 1)
      }
    } else {
      if (imageIndex === images.length - 1) {
        setImageIndex(0)
      } else {
        setImageIndex(imageIndex + 1)
      }
    }
  }

  return (
    <div className="slider">
      {imageIndex !== null && (
        <div className="fullSlider">
          <div className="arrow" onClick={() => changeSlide("left")}>
          <FaAngleDoubleLeft style={{ color: 'white', fontSize: '30px' }} />
          </div>
          <div className="imgContainer">
            <img src={images[imageIndex]} alt="" />
          </div>
          <div className="arrow" onClick={() => changeSlide("right")}>
          <FaAngleDoubleRight style={{ color: 'white', fontSize: '30px' }}/>
          </div>
          <div className="close" onClick={() => setImageIndex(null)}>
          <FaTimes style={{ color: 'white', fontSize: '40px' }} />
          </div>
        </div>
      )}
      <div className="bigImage">
        <img src={images[0]} alt="" onClick={() => setImageIndex(0)} />
      </div>
      <div className="smallImages">
        {images.slice(1).map((image, index) => (
          <img
            src={image}
            alt=""
            key={index}
            onClick={() => setImageIndex(index + 1)}
          />
        ))}
      </div>
    </div>
  )
}

export default Slider