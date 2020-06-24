import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import { Button, ButtonGroup } from '@material-ui/core';


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
    pager:{
      textAlign: "center",
      marginTop: theme.spacing(2)
    }
  }));
  const classes = useStyles();

  return (
    <div className={classes.pager}>
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
        {pageNumbers.map(number => (
          <Button key={number} onClick={() => paginate(number)} >
            {number}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
};
