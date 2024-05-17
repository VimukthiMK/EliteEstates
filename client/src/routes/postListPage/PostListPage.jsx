import "src/routes/postListPage/postListPage.scss"
import Filter from "src/components/filter/Filter"
import Card from "src/components/card/Card"
import Map from "src/components/map/Map"
import { useState, useContext, useEffect  } from "react"
import { SearchContext } from "src/context/SearchContext"
import { useSearchParams } from "react-router-dom"

const PostListPage = () => {
    const { updateQuery, posts, loading, error } = useContext(SearchContext)
    const [searchParams, setSearchParams] = useSearchParams()

    const [query, setQuery] = useState({
        type: searchParams.get("type") || "",
        city: searchParams.get("city") || "",
        property: searchParams.get("property") || "",
        minPrice: searchParams.get("minPrice") || "",
        maxPrice: searchParams.get("maxPrice") || "",
        bedroom: searchParams.get("bedroom") || "",
    })

    useEffect(() => {
        updateQuery(query)
    }, [query, updateQuery])

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