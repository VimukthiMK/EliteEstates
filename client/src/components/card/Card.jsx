import { Link } from "react-router-dom"
import "src/components/card/card.scss"

import { FaMapMarkerAlt, FaBath, FaBed, FaBookmark, FaCommentDots } from "react-icons/fa";


function Card({ item }) {
  return (
    <div className="card">
      <Link to={`/post?id=${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/post?id=${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <FaMapMarkerAlt style={{ color: 'black', fontSize: '20px' }} />
          <span>{item.address}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <FaBed style={{ color: 'black', fontSize: '20px' }} />
              <span>{item.bedroom} bedroom</span>
            </div>
            <div className="feature">
              <FaBath style={{ color: 'black', fontSize: '20px' }} />
              <span>{item.bathroom} bathroom</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <FaBookmark style={{ color: 'black', fontSize: '20px' }} />
            </div>
            <div className="icon">
              <FaCommentDots style={{ fontSize: '20px' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card