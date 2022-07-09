import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Plane } from  'react-loader-spinner';
import s from './Loader.module.css'

export const Loader = () => {

    return (
          <div className={s.Loader}>
             <Plane ariaLabel="loading-indicator" />
          </div>
          )
};
