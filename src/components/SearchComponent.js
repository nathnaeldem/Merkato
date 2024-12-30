import React, { useState } from "react";
import axios from "axios";
import "./SearchComponent.css";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "/bermenah/search.php",
        {
          params: { query, limit: 10 },
        }
      );
      if (response.data.success) {
        setResults(response.data.data);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <div className="search-container">
      <h1>Search Products & Offers</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
      <div className="results-container">
        {results.length > 0 ? (
          results.map((item) => (
            <div key={`${item.type}-${item.id}`} className="result-card">
              <img
                src={`data:image/jpeg;base64,${item.image}`} // Rendering base64 image
                alt={item.name}
                className="result-image"
              />
              <div className="result-details">
                <h3>{item.name}</h3>
                <p>Price: {item.price}</p>
                <p>Type: {item.type}</p>
              </div>
            </div>
          ))
        ) : (
            <div style={{marginLeft:'40%'}}><p >{loading ? "" : "No results found"}</p></div>
          
        )}
      </div>
    </div>
  );
};

export default SearchComponent;
