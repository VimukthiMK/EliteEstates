import { useState , useEffect } from "react"
import apiRequest from "src/lib/apiReq"
import { useNavigate } from "react-router-dom"

import "src/routes/newPostPage/newPostPage.scss"
import ReactQuill from "react-quill" // For styling the text
import "react-quill/dist/quill.snow.css"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { storage } from "src/config/FirebaseConfig"
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage"

function NewPostPage() {
  const [value, setValue] = useState("")
  const [images, setImages] = useState([])
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false) // Add loading state

  const navigate = useNavigate()

  // Image selection
  const handleImageSelection = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 4) {
      setError("You can only upload a maximum of 4 images.")
      return
    }
    setImages((prevImages) => [...prevImages, ...files])
  }

  // Remove Image 
  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index))
  }

  // Handle submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true) // Start loading

    if (images.length === 0) {
      setError("Please upload at least one image.")
      setLoading(false)
      return
    }
    if (images.length > 4) {
      setError("You can only upload a maximum of 4 images.")
      setLoading(false)
      return
    }

    const formData = new FormData(e.target)
    const inputs = Object.fromEntries(formData)

    try {
      const imageUrls = []
      // Upload Each image contains in the images[]
      for (const file of images) {
        const storageReference = storageRef(storage, `posts/${file.name}`)
        await uploadBytes(storageReference, file)
        const url = await getDownloadURL(storageReference)
        imageUrls.push(url)
      }
      // Api call
      const res = await apiRequest.post("/posts", {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          address: inputs.address,
          city: inputs.city,
          bedroom: parseInt(inputs.bedroom),
          bathroom: parseInt(inputs.bathroom),
          type: inputs.type,
          property: inputs.property,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          images: imageUrls,
        },
        postDetail: {
          desc: value,
          utilities: inputs.utilities,
          pet: inputs.pet,
          income: inputs.income,
          size: parseInt(inputs.size),
          school: parseInt(inputs.school),
          bus: parseInt(inputs.bus),
          restaurant: parseInt(inputs.restaurant),
        },
      })

      // Toast notification upon successful creation
      toast.success(res.data.message, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })

      // Clear form and images after successful submission
      setValue("")
      setImages([])
      e.target.reset()

      // Navigate 
      navigate(`/post?id=${res.data.newPost.id}`)
    } catch (err) { 
      setError("Error submitting the form")
    } finally {
      setLoading(false) // Stop loading
    }
  }

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />{" "}
              {/* Enables Text Styling */}
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={1} id="bedroom" name="bedroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={1} id="bathroom" name="bathroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Property</label>
              <select name="property">
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet">
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="school">School</label>
              <input min={0} id="school" name="school" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bus">Bus</label>
              <input min={0} id="bus" name="bus" type="number" />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant</label>
              <input min={0} id="restaurant" name="restaurant" type="number" />
            </div>

            <div className="item">
              <label htmlFor="image">Images</label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelection}
              />
            </div>
            <button className="sendButton" disabled={loading}>
              {loading ? "Submitting..." : "Create"}
            </button>

            {/* error */}
            {error && <span className="error">{error}</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {/* Display selected images */}
        {images.length > 0 &&
          images.map((image, index) => (
            <div key={index} className="imageContainer">
              <img
                src={URL.createObjectURL(image)}
                alt={`Selected ${index}`}
                style={{ width: "200px", height: "200px", objectFit: "cover" }}
              />
              {/* For Removing Images */}
              <button
                className="removeButton"
                onClick={() => handleRemoveImage(index)}
              >
                Remove
              </button>
            </div>
          ))}
      </div>
    </div>
  )
}

export default NewPostPage
