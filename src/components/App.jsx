import { Component } from 'react';
import { getPhotos } from './api';
import Notiflix from 'notiflix';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

export class App extends Component {
  state = {
    searchedPhrase: '',
    page: 1,
    images: [],
    selectedImage: null,
    isLoading: false,
  };

  fetchImages = async (query, page) => {
    this.setState({ isLoading: true });

    const images = await getPhotos(query, page);
    if (images.totalHits === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      this.setState({ isLoading: false });
    } else {
      Notiflix.Notify.success(`Horray! We found ${images.totalHits} images.`);
      this.setState(
        {
          images: images.hits,
          isLoading: false,
          page: page,
        },
        () => console.log(this.state.images)
      );
    }
  };

  // buildGallery = photos => {
  //   if (photos.totalHits > 0) {
  //     Notiflix.Notify.success(`Horray! We found ${photos.totalHits} images.`);
  //   } else {
  //     loadBtn.classList.add('is-hidden');
  //     Notiflix.Notify.failure(
  //       'Sorry, there are no images matching your search query. Please try Again.'
  //     );
  //   }
  //   if (photos.totalHits > 40) {
  //     loadBtn.classList.remove('is-hidden');
  //   }
  // };

  // createAnotherPage = async () => {
  //   currentPage++;

  //   const photos = await getPhotos(inputEl.value.trim(), currentPage);

  //   if (photos.totalHits > currentPage * 40) {
  //     loadBtn.classList.remove('is-hidden');
  //   } else {
  //     loadBtn.classList.add('is-hidden');
  //     Notiflix.Notify.info(
  //       "We're sorry, but you've reached the end of search results."
  //     );
  //   }
  // };
  // searchPhotos = query => {
  //   this.setState({ page: 1, searchedPhrase: query });
  //   if (searchedPhrase === '') {
  //     galleryEl.innerHTML = '';
  //     return;
  //   }
  //   getPhotos(searchedPhrase)
  //     .then(photos => buildGallery(photos))
  //     .catch(error => console.log(error));
  // };

  handleSearch = query => {
    this.setState({ searchedPhrase: query, page: 1, images: [] }, () => {
      this.fetchImages(query, 1);
    });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery images={this.state.images} />
      </div>
    );
  }
}
