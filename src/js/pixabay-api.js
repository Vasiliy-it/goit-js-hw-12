import axios from 'axios';

const API_KEY = '46887130-d3f8e3821f1ed34df6d7a3ffd';
const BASE_URL = 'https://pixabay.com/api/';


export async function searchImages(query, page = 1) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: 15,
      },
    });
    const { hits, totalHits } = response.data;
    return { images: hits, totalHits };
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error; 
  }
}

export async function loadMoreImages(query, page) {
  return await searchImages(query, page); 
}
