import { useState, useEffect } from 'react'
import "src/routes/homePage/homePage.scss"

import HomeBanner1 from "../../assets/images/home-banner-1.jpg"
import HomeBanner2 from "../../assets/images/home-banner-2 .jpg"
import HomeBanner3 from "src/assets/images/auth-banner.jpg"

const HomePage = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const images = [HomeBanner1, HomeBanner2, HomeBanner3]
    const intervalDuration = 5000 // Change image every 10 seconds

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex(prevIndex =>
                (prevIndex + 1) % images.length
            )
        }, intervalDuration)

        return () => clearInterval(intervalId)
    }, [images.length])

    return (
        <div className="homePage">
            <div className="textContainer">
                <div className="wrapper">
                    <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
                    <p>
                        Turning your dream place into reality is within reach!
                        The first step is to clearly define your needs and wants.
                        Consider your budget, desired location, and the must-have features for your ideal home.
                        With that knowledge, you can then explore real estate websites or connect with a realtor
                        to search for properties that align perfectly with your vision.
                    </p>
                    <div className="boxes">
                        <div className="box">
                            <h1>5+</h1>
                            <h2>Years of Experience</h2>
                        </div>
                        <div className="box">
                            <h1>10</h1>
                            <h2>Award Gained</h2>
                        </div>
                        <div className="box">
                            <h1>200+</h1>
                            <h2>Property Ready</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="imgContainer">
                <img src={images[currentImageIndex]} alt="" />
            </div>
        </div>
    )
}

export default HomePage
