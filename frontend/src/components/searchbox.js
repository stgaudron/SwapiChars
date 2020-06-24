import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import useSWR from 'swr';
import axios from 'axios';


const fetcher = async (...args) => {
  const response = await axios(...args);
  return response.data.results;
}

export default function Searchbox() {

  const {data, error} = useSWR(() => "http://localhost:4000/char", fetcher);

  console.log(data)

  const defaultProps = {
    options: data,
    getOptionLabel: (option) => option.name,
  };

  console.log(defaultProps.options)

  const [value, setValue] = React.useState(null);

  if (error)
    return <div>{error.message}</div>;

  return (
    <div style={{ width: 300}}>
      <Autocomplete
        {...defaultProps}
        id="controlled-demo"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} label="search by name" margin="normal" />}
        />
    </div>
  )
}
