import "src/routes/singlePostPage/singlePostPage.scss"
import Slider from "src/components/slider/Slider"
import Map from "src/components/map/Map"
import DOMPurify from "dompurify"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "src/context/AuthContext"
import { useLocation } from "react-router-dom"
import queryString from 'query-string'
import apiRequest from "src/lib/apiReq"

const SinglePostPage = () => {
  const { currentUser } = useContext(AuthContext)
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const location = useLocation()
  const queryParams = queryString.parse(location.search)
  const id = queryParams.id

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await apiRequest("/posts/" + id)
        setPost(res.data)
      } catch (error) {
        setError("Failed to fetch post")
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
  }, [id])

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
              <img src={post.user.avatar} alt="" />
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
              <div className="featureText">
                <span>Income Policy</span>
                <p>{post.postDetail.income}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <span>{post.postDetail.size} sqft</span>
            </div>
            <div className="size">
              <span>{post.bedroom} beds</span>
            </div>
            <div className="size">
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
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
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetail.bus}m away</p>
              </div>
            </div>
            <div className="feature">
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
            <button>Send a Message</button>
            <button></button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SinglePostPage
