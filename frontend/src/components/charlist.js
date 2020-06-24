import React, {useState, useEffect} from 'react';
import Pagination from './pagination';
import Chars from './chars';
import axios from 'axios';



export default function PaginatedList() {
  const [chars, setChars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [charsPerPage] = useState(12);
  const [query, setQuery] = useState('');

  const fetchChars = async (query) => {
    setLoading(true);
    const res = await axios.get(`http://localhost:4000/char?search=${query}`);
    setChars(res.data.results);
    setLoading(false);
  };

  useEffect(() => {
    fetchChars(query);
  },[]);

  const indexOfLastChar = currentPage * charsPerPage;
  const indexOfFirstChar = indexOfLastChar - charsPerPage;
  const currentChar = chars.slice(indexOfFirstChar, indexOfLastChar);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  function handleOnInputChange ( event ) {

    setQuery(event.target.value);
    fetchChars (query);
  };


  return (
    <div>
      <div style={{display: 'flex',  justifyContent:'center'}}>
        <label className="search-label" htmlFor="search-input">
          <input
            type="text"
            name="query"
            value={query}
            id="search-input"
            placeholder="Search by name"
            onChange={handleOnInputChange}
          />
        </label>
      </div>
      <Chars chars={currentChar} loading={loading} />
      <Pagination charsPerPage={charsPerPage} totalChars={chars.length} paginate={paginate} />
    </div>

  );
}
