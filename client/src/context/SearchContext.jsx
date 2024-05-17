import { createContext, useState, useEffect } from "react"
import apiRequest from "src/lib/apiReq"

export const SearchContext = createContext()

export const SearchContextProvider = ({ children }) => {
    const [query, setQuery] = useState(null)
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const updateQuery = (data) => {
        setQuery(data)
    }

    const fetchPosts = async (query) => {
        setLoading(true)
        setError(null)
        console.log(query)
        try {
            const res = await apiRequest.get("/posts", {
                params: query,
            })
            
            setPosts(res.data)
        } catch (err) {
            setError("Failed to fetch posts")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (query !== null) {
            fetchPosts(query)
        }
    }, [query])

    return (
        <SearchContext.Provider value={{ updateQuery, posts, loading, error }}>
            {children}
        </SearchContext.Provider>
    )
}
