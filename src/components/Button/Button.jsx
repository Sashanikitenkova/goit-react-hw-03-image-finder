import PropTypes from 'prop-types';
import s from './Button.module.css'

export const Button = ({ onClick }) => (

    <button type="button" className={s.Button} onClick={onClick}>Load more</button> 
);


Button.propTypes = {
    onClick: PropTypes.func.isRequired,
};

