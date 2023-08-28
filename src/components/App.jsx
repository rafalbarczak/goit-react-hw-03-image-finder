import { Component } from 'react';
import { getPhotos } from './api';
import Notiflix from 'notiflix';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

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

    try {
      const images = await getPhotos(query, page);
      if (images.totalHits === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        this.setState({ isLoading: false });
      } else {
        this.setState(
          prevState => ({
            images: [...prevState.images, ...images.hits],
            isLoading: false,
            page: page,
          }),
          () => {
            if (this.state.page === 1) {
              Notiflix.Notify.success(
                `Horray! We found ${images.totalHits} images.`
              );
            }
          }
        );

        if (images.totalHits < this.state.page * 40) {
          Notiflix.Notify.info(
            "We're sorry, but you've reached the end of search results."
          );
        }
      }
    } catch (error) {
      console.error('Error fetching images:', error);
      Notiflix.Notify.failure(
        'Oops! Something went wrong while fetching images.'
      );
    }
    this.setState({ isLoading: false });
  };

  handleSearch = query => {
    this.setState({ searchedPhrase: query, page: 1, images: [] }, () => {
      this.fetchImages(query, 1);
    });
  };

  handleButton = () => {
    this.fetchImages(this.state.searchedPhrase, this.state.page + 1);
  };

  handleImageClick = image => {
    this.setState({ selectedImage: image });
  };

  handleModalClose = () => {
    this.setState({ selectedImage: null });
  };

  handleKeyDown = e => {
    if (e.key === 'Escape') {
      this.handleModalClose();
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleSearch} />
        <ImageGallery
          images={this.state.images}
          onClick={this.handleImageClick}
        />
        {this.state.isLoading && <Loader />}
        {this.state.images.length > 0 && <Button onClick={this.handleButton} />}
        {this.state.selectedImage && (
          <Modal
            image={this.state.selectedImage}
            onClick={this.handleModalClose}
          />
        )}
      </div>
    );
  }
}
