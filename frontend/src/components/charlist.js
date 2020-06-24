import React, {useState, useEffect, useMemo, useCallback} from 'react';
import Pagination from './pagination';
import Chars from './chars';
import useSWR from 'swr';
import fetcher from './fetcher';


export default function PaginatedList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [charsPerPage] = useState(12);
  const [query, setQuery] = useState('');
  console.log(query)

  const { data, error } = useSWR(`/char?search=${query}`, fetcher);
  const chars = useMemo(() => data ? data.results : [], [data]);
  const loading = useMemo(() => !data && !error, [data, error]);

  const currentChar = useMemo(() => {
    const indexOfLastChar = currentPage * charsPerPage
    const indexOfFirstChar = indexOfLastChar - charsPerPage
    return chars.slice(indexOfFirstChar, indexOfLastChar)
  }, [chars, currentPage, charsPerPage]);

  const handleOnInputChange = useCallback((event) => {
    setQuery(event.target.value)
  }, [setQuery]);

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
      <Pagination charsPerPage={charsPerPage} totalChars={chars.length} paginate={setCurrentPage} />
    </div>

  );
}
