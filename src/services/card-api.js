const BASE_URL = 'https://pixabay.com/api/';
const KEY = '22269810-55457156398dac84727ab5964';
const perPage = '12';

function fetchImages(searchImages, page) {
  return fetch(
    `${BASE_URL}?image_type=photo&orientation=horizontal&q=${searchImages}&page=${page}&per_page=${perPage}&key=${KEY}`,
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      }
    })
    .then(response => {
      return response.hits;
    });
}

const api = {
  fetchImages,
};

export default api;
