import PropTypes from 'prop-types';
import ImageGalleryItem from "components/ImageGalleryItem/ImageGalleryItem";
import s from './ImageGallery.module.css'

export const ImageGallery = ({imageSearch, onClick}) => {
   
            return (
                <ul className={s.ImageGallery}>
                         {imageSearch.map(({id, webformatURL, largeImageURL, tags}) => (
                             <ImageGalleryItem 
                                  key={id}
                                  id={id}
                                  webformatURL={webformatURL}
                                  largeImageURL={largeImageURL}
                                  tags={tags}
                                  onClick={onClick}
                             />
                         ))}
                </ul>  
            )
  };

ImageGallery.propTypes = {
    imageSearch: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        largeImageURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
      })
    ),
    onClick: PropTypes.func.isRequired,
};



  







