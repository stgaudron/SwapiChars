import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink} from 'react-router-dom';
import Link from '@material-ui/core/Link';
import {CircularProgress} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  grid: {
    margin: theme.spacing(1),
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, 200px)",
    gridGap: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      gridGap: theme.spacing(1),
    }
  },
  progress: {
    textAlign: "center",
    marginTop: theme.spacing(2)
  }
}));

export default function Chars ({ chars, loading }) {

const classes = useStyles();

  if (loading) {
    return <div className={classes.progress}><CircularProgress color="secondary" /></div>;
  }



  return (
    <div className={classes.root}>


    <div className={classes.grid}>
      {chars.map(char => (
        <Card key={char.name}>
        <Link underline ='none' component={RouterLink} to={"/"+char.name}>
          <CardHeader title={char.name} />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                Birth Year : {char.birth_year} < br/>
                Gender : {char.gender} < br/>
                Height : {char.height} < br/>
              </Typography>
          </CardContent>
        </Link>
        </Card>
    ))}
  </div>
  </div>

  );
};
