import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
}));

export default function Chardetail({name}) {
  const classes = useStyles();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(({name}) => {
    const fetchDetails = async () => {
      setLoading(true);
      const res = await axios.get("http://localhost:4000/char/"+name);
      setDetails(res.data);
      setLoading(false);
    };

    fetchDetails();
  }, []);

  return (
    <div className={classes.root}>
      <Paper elevation={2}>
        <Typography variant="body2" color="textSecondary" component="p">
          Birth Year : {details.birth_year} < br/>
          Eye Color : {details.eye_color} < br/>
          Gender : {details.gender} < br/>
          Hair Color : {details.hair_color} < br/>
          Height : {details.height} < br/>
          Mass : {details.mass} < br/>
          Skin Color : {details.skin_color} < br/>
        </Typography>
      </Paper>

    </div>
  );
}
