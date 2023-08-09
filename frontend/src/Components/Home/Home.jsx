import React, { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [items, setItems] = useState([]);

  const handleSearch = async () => {
    try {
      // console.log("f: ", query);
      const response = await axios.get(`http://localhost:5000/api/${query}`);
      // console.log("f :",response);
      setSearchResults(response.data);

      const rows = [];
      // console.log(response.data.length);
      for (let i = 0; i < response.data.length; i += 4) {
        // console.log("one item:", response[i]);
        rows.push(response.data.slice(i, i + 4));
      }

      setItems(rows);
      // console.log("response: ", response);
      // console.log("rows: ", rows);
      // console.log("final list: ", items);
    } catch (error) {
      console.error('Error fetching search results:', error);
      alert("No images found");
    }
  };


  return (
    
    <div>
      <h1 className='mb-5'>Search Images</h1>
      <input className='mb-5'
        style={{marginRight: "10px", height: "40px"}}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="search images"
      />
      <button style={{marginLeft: "10px"}} className='btn btn-success ml-2' onClick={handleSearch}>Search</button>


      <div className="container">
      {items.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((item, columnIndex) => (
            <div className="col-md-3" key={columnIndex}>
              <img src={item.thumbnailurl} alt={`Image ${rowIndex * 4 + columnIndex}`} className="img-fluid" />
            </div>
          ))}
        </div>
      ))}
    </div>
    
    </div>
  );
}


