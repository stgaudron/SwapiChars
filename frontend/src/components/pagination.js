import React from 'react';
import { makeStyles} from '@material-ui/core/styles';


export default function Pagination ({ charsPerPage, totalChars, paginate }){
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalChars / charsPerPage); i++) {
    pageNumbers.push(i);
  }

  const useStyles = makeStyles((theme) => ({
    list:{
      display: 'block',
      marginLeft: 'auto',
      marginRight: 'auto',
      paddingRight: '5',
    },
    pagination:{
      flexGrow : 1,
      display: 'inline',
      textAlign: 'center',
      },
  }));
  const classes = useStyles();

  return (
    <div style={{display: 'flex',  justifyContent:'center'}}>

    <ul className={classes.list}>
        {pageNumbers.map(number => (
          <li key={number} className={classes.pagination}>
            <button onClick={() => paginate(number)} >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
