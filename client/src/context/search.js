import { useState, useContext, createContext } from "react";

const SearchContext = createContext();
const SearchProvider = ({ chilren }) => {
  const [auth, setAuth] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {chilren}
    </SearchContext.Provider>
  );
};

// suctom hook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
