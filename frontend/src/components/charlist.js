import React, {useState, useEffect, useMemo, useCallback} from 'react';
import Pagination from './pagination';
import Chars from './chars';
import useSWR from 'swr';
import fetcher from './fetcher';
import TextField from '@material-ui/core/TextField';


export default function PaginatedList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [charsPerPage] = useState(12);
  const [query, setQuery] = useState('');

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
    if(currentPage !== 1) setCurrentPage(1)
  }, [setQuery, currentPage, setCurrentPage]);

  return (
    <div>
      <div style={{display: 'flex',  justifyContent:'center'}}>

        <TextField placeholder="Search by name" value={query} onChange={handleOnInputChange} />
      </div>
      <Chars chars={currentChar} loading={loading} />
      <Pagination charsPerPage={charsPerPage} totalChars={chars.length} paginate={setCurrentPage} />
    </div>

  );
}
