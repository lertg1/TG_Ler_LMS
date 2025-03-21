import axios from 'axios';

const API_URL = 'http://localhost:8080/api/books';

const getBooks = async (params) => {
  const response = await axios.get(API_URL, { params });
  return response.data;
};

export default { getBooks };

