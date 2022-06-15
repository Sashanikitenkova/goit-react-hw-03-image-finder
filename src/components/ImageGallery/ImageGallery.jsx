import React, {Component} from "react";
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import Button from "components/Button/Button";
import Loader from "components/Loader/Loader";
import { Modal } from "components/Modal/Modal";
import s from './ImageGallery.module.css'

export class ImageGallery extends Component {
    state = {
        imageSearch: [],
        largeImageURL: null,
        page: 1,
        error: null,
        showModal: false,
        status: 'idle',
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.imageName !== this.props.imageName) {
            this.setState({ status: 'pending', imageSearch: []})
            this.fetchImages();
        }
    }

    fetchImages = () => {
        const {page} = this.state;

        this.setState({ status: 'pending'})

            fetch(`https://pixabay.com/api/?key=25749295-c1c91c3a002bacdc6232fef3b&q=${this.props.imageName}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`)
            .then(response => {
                if (response.ok) {
                   return response.json();
                }

                return Promise.reject(
                    new Error(`No photos on request ${this.props.imageName}`),
                );
            }
            )
            .then(({hits}) => {
                  this.setState(({imageSearch}) => ({
                  imageSearch: [...imageSearch, ...hits],
                  page: page+1,
                  status: 'resolved',
             }))
           });
        //    .cath(error => this.setState({error, status: 'rejected'}));
          
    }

    toggModal = picture => {
       this.setState(({showModal}) => ({ showModal: !showModal }));
       this.setState({ largeImageURL: picture });
    }
  
    render () {
        const { imageSearch, largeImageURL, error, showModal, status } = this.state;

        if(status === 'idle') {
            return 
            // <div>Введите имя фотографии</div>
        }

        if(status === 'pending') {
            return <Loader />
        }

        if(status === 'rejected') {
            return <h1>{error.massage}</h1>
        }

        if(status === 'resolved') {
            return <>
                     <ul className={s.ImageGallery}>
                         {imageSearch.map(({id, webformatURL, largeImageURL, tags}) => (
                             <ImageGalleryItem 
                                  key={id}
                                  id={id}
                                  webformatURL={webformatURL}
                                  largeImageURL={largeImageURL}
                                  tags={tags}
                                  onClick={this.toggModal}
                             />
                         ))}
                     </ul>  
                     <Button onClick={this.fetchImages}/> 
                     {showModal && <Modal onClose={this.toggModal}><img src={largeImageURL} alt="" /></Modal>} 
                   </> 
        }
    }
  };

  








