import "src/routes/singlePostPage/singlePostPage.scss"
import Slider from "src/components/slider/Slider"
import Map from "src/components/map/Map"
import DOMPurify from "dompurify"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "src/context/AuthContext"
import { useLocation , useNavigate } from "react-router-dom"
import queryString from 'query-string'
import apiRequest from "src/lib/apiReq"

import { FaPaw,FaTools,FaUtensils, FaBus,FaSchool,FaBath , FaBed ,FaMoneyCheckAlt, FaCompress ,FaCommentDots,FaBookmark} from "react-icons/fa"

const SinglePostPage = () => {
  const [post, setPost] = useState(null)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext)

  const location = useLocation()
  const queryParams = queryString.parse(location.search)
  const id = queryParams.id

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await apiRequest.get(`/posts/post?id=${id}`)
        setPost(res.data)
        setSaved(res.data.isSaved)
      } catch (error) {
        setError("Failed to fetch post")
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])
  
  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login")
    }
    setSaved((prev) => !prev)
    try {
      await apiRequest.post("/posts/save", { postId: id })
    } catch (err) {
      console.log(err)
      setSaved((prev) => !prev)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          {post.images && <Slider images={post.images} />}
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                {post.user && (
                  <>
                    <img src={post.user.avatar} alt="" />
                    <span>{post.user.username}</span>
                  </>
                )}
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
            <FaTools style={{ color: 'green', fontSize: '25px' }} />
              <div className="featureText">
                <span>Utilities</span>
                {post.postDetail.utilities === "owner" ? (
                  <p>Owner is responsible</p>
                ) : (
                  <p>Tenant is responsible</p>
                )}
              </div>
            </div>
            <div className="feature">
            <FaPaw style={{ color: 'green', fontSize: '25px' }} />
              <div className="featureText">
                <span>Pet Policy</span>
                {post.postDetail.pet === "allowed" ? (
                  <p>Pets Allowed</p>
                ) : (
                  <p>Pets not Allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
            <FaMoneyCheckAlt style={{ color: 'green', fontSize: '25px' }} />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
            <FaCompress style={{ color: 'green', fontSize: '25px' }}/>
              <span>{post.postDetail.size} sqft</span>
            </div>
            <div className="size">
            <FaBed style={{ color: 'green', fontSize: '25px' }}/>
              <span>{post.bedroom} beds</span>
            </div>
            <div className="size">
            <FaBath style={{ color: 'green', fontSize: '25px' }}/>
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
            <FaSchool style={{ color: 'green', fontSize: '25px' }} />
              <div className="featureText">
                <span>School</span>
                <p>
                  {post.postDetail.school > 999
                    ? post.postDetail.school / 1000 + "km"
                    : post.postDetail.school + "m"}{" "}
                  away
                </p>
              </div>
            </div>
            <div className="feature">
            <FaBus style={{ color: 'green', fontSize: '25px' }}/>
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetail.bus}m away</p>
              </div>
            </div>
            <div className="feature">
            <FaUtensils style={{ color: 'green', fontSize: '25px' }}/>
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetail.restaurant}m away</p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button><FaCommentDots style={{ color: 'green', fontSize: '25px' }}/>Send a Message</button>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? "#fece51" : "white",
              }}
            >
              <FaBookmark style={{ color: 'green', fontSize: '25px' }}/>
              {saved ? "Place Saved" : "Save the Place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SinglePostPage
