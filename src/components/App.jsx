import React, {Component} from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Searchbar} from "./Searchbar/Searchbar";
import {ImageGallery} from "./ImageGallery/ImageGallery";
import s from './App.module.css';

export class App extends Component {
  state = {
    imageName:'',
  }

  handleFormSubmit = imageName => {
    this.setState({imageName});
  }

  render () {
    const {imageName} = this.state;

    return (
        <div className={s.App}>
          <Searchbar onSubmit={this.handleFormSubmit} />
          <ImageGallery imageName={imageName} />
          <ToastContainer autoClose={3000} />
        </div>
    );
  }
};
