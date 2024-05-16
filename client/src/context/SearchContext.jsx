import { createContext, useState} from "react"


export const SearchContext = createContext()

export const SearchContextProvider = ({ children }) => {
    const [filterParams, setFilterParams] = useState(null)
    

// update query
  const updateQuery = (data) => {
    setFilterParams(data)
  }

  return (
    <SearchContext.Provider value={{ updateQuery, filterParams }}>
      {children}
    </SearchContext.Provider>
  )
}