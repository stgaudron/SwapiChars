import React, {useState, useEffect} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Pagination from './pagination';
import Chars from './chars';
import axios from 'axios';



export default function PaginatedList() {
  const [chars, setChars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [charsPerPage] = useState(12);


  useEffect(() => {
    const fetchChars = async () => {
      setLoading(true);
      const res = await axios.get('http://localhost:4000/char');
      setChars(res.data.results);
      setLoading(false);
    };

    fetchChars();
  }, []);

  const indexOfLastChar = currentPage * charsPerPage;
  const indexOfFirstChar = indexOfLastChar - charsPerPage;
  const currentChar = chars.slice(indexOfFirstChar, indexOfLastChar);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <Chars chars={currentChar} loading={loading} />
      <Pagination charsPerPage={charsPerPage} totalChars={chars.length} paginate={paginate} />
    </div>

  );
}
