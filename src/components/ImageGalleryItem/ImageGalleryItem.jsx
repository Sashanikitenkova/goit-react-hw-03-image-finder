import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css'

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags, onClick }) => {

    return (
                       <li onClick={() => onClick(largeImageURL)} className={s.ImageGalleryItem}>
                           <img className={s.ImageGalleryItemImage} src={webformatURL} alt={tags} width="300"  />
                       </li>
    )
    
} 

ImageGalleryItem.propTypes = {
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
}

export default ImageGalleryItem;