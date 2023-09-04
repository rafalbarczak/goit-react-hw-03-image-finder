import { Component } from 'react';
import Notiflix from 'notiflix';
import css from './ImageGallery.module.css';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import { Loader } from 'components/Loader/Loader';
import { getPhotos } from 'components/api';

export class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    isLoading: false,
    prevQuery: '',
  };

  fetchImages = async () => {
    const { query } = this.props;
    const { page, prevQuery } = this.state;

    this.setState({ isLoading: true });

    if (query !== prevQuery) {
      this.setState({ page: 1, prevQuery: query, images: [] });
    }

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

  componentDidUpdate(prevProps) {
    if (this.props.query !== prevProps.query) {
      this.fetchImages();
    }
  }

  handleButton = () => {
    this.setState(
      prevState => ({ page: prevState.page + 1 }),
      () => {
        this.fetchImages();
      }
    );
  };
  render() {
    const { onClick } = this.props;
    const { images, isLoading } = this.state;

    return (
      <div>
        {isLoading && <Loader />}
        <ul className={css.gallery}>
          {images.map(image => (
            <ImageGalleryItem
              image={image}
              onClick={() => onClick(image)}
              key={image.id}
            />
          ))}
        </ul>
        {images.length > 0 && <Button onClick={this.handleButton} />}
      </div>
    );
  }
}
