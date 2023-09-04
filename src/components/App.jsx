import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    searchedPhrase: '',
    selectedImage: null,
  };

  handleSearch = query => {
    this.setState({ searchedPhrase: query });
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
          onClick={this.handleImageClick}
          query={this.state.searchedPhrase}
        />
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
