import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import useSWR from 'swr';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    },
}));

const fetcher = async (...args) => {
  const response = await axios(...args);
  return response.data;
}

export default function Chardetail(props) {
  const classes = useStyles();

  const {data, error} = useSWR(() => "http://localhost:4000/char/" + props.match.params.name, fetcher)

  const details = data ? data : {};

  console.log("Chardetail", props, details)

  if (error)
    return <div>{error.message}</div>;

  return (
    <div className={classes.root}>
      <Card>
        <CardHeader title={details.name} />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              Birth Year : {details.birth_year} < br/>
              Eye Color : {details.eye_color} < br/>
              Gender : {details.gender} < br/>
              Hair Color : {details.hair_color} < br/>
              Height : {details.height} < br/>
              Mass : {details.mass} < br/>
              Skin Color : {details.skin_color} < br/>
            </Typography>
          </CardContent>
      </Card>
    </div>
  );
}
