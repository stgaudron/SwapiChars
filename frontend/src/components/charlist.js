import React, {useState, useMemo, useCallback} from 'react';
import Pagination from './pagination';
import Chars from './chars';
import useSWR from 'swr';
import fetcher from './fetcher';
import TextField from '@material-ui/core/TextField';
import { debounce } from '@material-ui/core';


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

  const handleOnInputChange = useCallback(debounce((input) => {
    setQuery(input)
    if(currentPage !== 1) setCurrentPage(1)
  }, 200), [setQuery, currentPage, setCurrentPage]);

  return (
    <div>
      <div style={{display: 'flex',  justifyContent:'center'}}>

        <TextField placeholder="Search by name" defaultValue={query} onChange={(e) => handleOnInputChange(e.target.value)} />
      </div>
      <Chars chars={currentChar} loading={loading} />
      <Pagination charsPerPage={charsPerPage} totalChars={chars.length} paginate={setCurrentPage} />
    </div>

  );
}
