import axios from 'axios';

const fetcher = async (...args) => {
  const response = await axios(...args);
  return response.data;
}

export default fetcher;
