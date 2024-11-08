import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import { searchImages, loadMoreImages } from "./js/pixabay-api";
import { generateGalleryMarkup, startLoader, stopLoader } from "./js/render-functions";

const searchForm = document.querySelector('.search-form');
const searchInput = searchForm.querySelector('input[type=search]');
const galleryList = document.querySelector('.gallery__list');
const loadMoreButton = document.querySelector('.load-more-button');
const loaderContainer = document.querySelector('.loader__container');

let lightbox;
let page = 1;
let totalHits = 0;
let loadedHits = 0;
let query = '';

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  query = searchInput.value.trim();

  if (query === '') {
    iziToast.error({
      title: 'Error',
      message: 'Fill search input!',
      position: 'topRight'
    });
    return;
  }

  
  galleryList.innerHTML = '';
  page = 1;
  loadedHits = 0;
  loadMoreButton.style.display = 'none';
  loaderContainer.style.display = 'none';

  try {
    const { images, totalHits: total } = await searchImages(query, page);
    totalHits = total;
    loadedHits += images.length;

    if (images.length === 0) {
      iziToast.info({
        title: 'Info',
        message: 'No images found.',
        position: 'topRight',
      });
      return;
    }

    galleryList.innerHTML = generateGalleryMarkup(images);

  
    if (lightbox) {
      lightbox.refresh();
    } else {
      lightbox = new SimpleLightbox('.gallery__list a', {
        captionsData: 'alt',
        captionDelay: 250,
      });
    }

    searchInput.value = '';

    
    if (loadedHits < totalHits) {
      loadMoreButton.style.display = 'block';
    } else {
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong with the search request.',
      position: 'topRight',
    });
  }
});


loadMoreButton.addEventListener("click", async (event) => {
  event.preventDefault();
  page += 1;

  
  loaderContainer.style.display = 'block';

  try {
    const { images } = await loadMoreImages(query, page);
    loadedHits += images.length;
    galleryList.insertAdjacentHTML('beforeend', generateGalleryMarkup(images));

    
    lightbox.refresh();
    smoothScrollToNewImages();

    if (loadedHits >= totalHits) {
      loadMoreButton.style.display = 'none';
      iziToast.info({
        title: 'Info',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images.',
      position: 'topRight',
    });
  } finally {
    loaderContainer.style.display = 'none';
  }
});


function smoothScrollToNewImages() {
  const { height: cardHeight } = galleryList.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
