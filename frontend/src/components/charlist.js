import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useFetch } from "./hooks";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
}));

export default function PaginatedList() {
  const classes = useStyles();
  const theme = useTheme();
  const [data, loading] = useFetch(
    "http://localhost:4000/char?limit=12&page=1"
  );

  return (
    <div className={classes.root}>
      {loading ? (
        "Loading..."
      ) : (
        <div className={classes.grid}>
          {data.results.map(char => (
            <Card key={char.name}>
              <CardHeader title={char.name} />
                <CardContent>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {char.birth_year} < br/>
                    {char.eye_color} < br/>
                    {char.gender} < br/>
                    {char.hair_color} < br/>
                    {char. height} < br/>
                    {char.mass} < br/>
                    {char.skin_color} < br/>
                  </Typography>
              </CardContent>
            </Card>
        ))}
      </div>
    )}
  </div>
  );
}
