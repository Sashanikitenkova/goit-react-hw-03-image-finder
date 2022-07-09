import React, {Component} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchData } from "services/imagesApi";
import {Searchbar} from "./Searchbar/Searchbar";
import {ImageGallery} from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Modal } from "./Modal/Modal";
import { Loader } from "./Loader/Loader";
import s from './App.module.css';

export class App extends Component {
  state = {
    imageSearch: [],
    isLoading: false,
    imageName: '',
    error: null,
    page: 1,
    showModal: false,
    largeImageURL: null,
  }

  componentDidUpdate(prevProps, prevState) {
    const { imageName, page } = this.state;

    if(prevState.imageName !== imageName || (prevState.page !== page && page !== 1)) {
        this.fetchImages();
    }
}

fetchImages = () => {
  const { imageName, page } = this.state;
  const perPage = 12;

  this.setState({ isLoading: true });

  fetchData(imageName, page, perPage)
  .then(({ hits, totalHits }) => {
    const totalPages = Math.ceil(totalHits / perPage);

    if (hits.length === 0) {
      return toast('Sorry, no images found. Please, try again!');
    }

    if (page === 1) {
      toast(`Hooray! We found ${totalHits} images.`);
    }

    if (page === totalPages) {
      toast("You've reached the end of search results.");
    }

    const data = hits.map(({id, webformatURL, largeImageURL, tags}) => {
      return {
        id,
        webformatURL,
        largeImageURL,
        tags,
      };
    });

    this.setState(({imageSearch}) => ({
      imageSearch: [...imageSearch, ...data],
      total: totalHits,
    }))
  })
  .catch(error => this.setState({ error }))
  .finally(() => this.setState({ isLoading: false }));
};

  handleFormSubmit = imageName => {
    if (imageName === this.state.imageName) return;
    this.setState({
      imageSearch: [],
      imageName,
      page: 1,
      error: null,
    });
  };

  onLoadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
      isLoading: true,
    }));
  };

  toggModal = picture => {
    this.setState(({showModal}) => ({ showModal: !showModal }));
    this.setState({ largeImageURL: picture });
 }

  render () {
    const { imageSearch, error, isLoading, showModal, largeImageURL, tags, total } = this.state;
    const loadImages = imageSearch.length !== 0;
    const isLastPage = imageSearch.length === total;
    const loadMoreBtn = loadImages && !isLoading && !isLastPage;

    return (
        <div className={s.App}>
          <Searchbar onSubmit={this.handleFormSubmit} />

          {error && toast(error.message)}

          {isLoading && <Loader />}

          {loadImages && (
          <ImageGallery imageSearch={imageSearch} onClick={this.toggModal} />)}
          
          {loadMoreBtn &&
          <Button onClick={this.onLoadMore}/> }
          
          {showModal && <Modal onClose={this.toggModal}><img src={largeImageURL} alt={tags} /></Modal>} 

          <ToastContainer autoClose={3000} />
        </div>
    );
  }
};

