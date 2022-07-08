import axios from 'axios';

const API_KEY = '25749295-c1c91c3a002bacdc6232fef3b';
const BASE_URL = 'https://pixabay.com';

export const fetchData = (imageName, page, perPage) => {
    return axios
      .get(
        `${BASE_URL}/api/?q=${imageName}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
      )
      .then(response => response.data);
  };