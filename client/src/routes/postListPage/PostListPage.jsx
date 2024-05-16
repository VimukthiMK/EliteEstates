import "src/routes/postListPage/postListPage.scss"
import Filter from "src/components/filter/Filter"
import Card from "src/components/card/Card"
import Map from "src/components/map/Map"
import { useState, useContext  } from "react"
import apiRequest from "src/lib/apiReq"
import { SearchContext } from "src/context/SearchContext"
import { useSearchParams } from "react-router-dom"

const PostListPage = () => {
    const { filterParams } = useContext(SearchContext)
    
    const [searchParams, setSearchParams] = useSearchParams()
    const [params, setParams] = useState({
        type: searchParams.get("type") || "",
        city: searchParams.get("city") || "",
        property: searchParams.get("property") || "",
        minPrice: searchParams.get("minPrice") || "",
        maxPrice: searchParams.get("maxPrice") || "",
        bedroom: searchParams.get("bedroom") || "",
    })
    const [posts, setPosts] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch posts
    const fetchPosts = async () => {
        if(filterParams){
            setParams(filterParams)
        }
        try {
            const res = await apiRequest.get("/posts", {
                params
            })
            setPosts(res.data)
        } catch (error) {
            setError("Failed to fetch posts")
        } finally {
            setLoading(false)
        }
    }

    // Function call
    fetchPosts()

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div className="listPage">
            <div className="listContainer">
                <div className="wrapper">
                    <Filter />
                    {posts && posts.length > 0 ? (
                        posts.map((post) => <Card key={post.id} item={post} />)
                    ) : (
                        <p>No posts found.</p>
                    )}
                </div>
            </div>
            <div className="mapContainer">
                {posts && posts.length > 0 ? <Map items={posts} /> : <p>No posts found.</p>}
            </div>
        </div>
    )
}

export default PostListPage