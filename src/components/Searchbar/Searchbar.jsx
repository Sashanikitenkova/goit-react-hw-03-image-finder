import React, {Component} from "react";
import {toast} from 'react-toastify';
import { MdSearch } from "react-icons/md";
import s from "./Searchbar.module.css";

export class Searchbar extends Component {
    state = {
        imageName: '',
    }

    handleNameChange = event => {
        this.setState({imageName: event.currentTarget.value.toLowerCase()});
    }

    handleSubmit = event => {
        event.preventDefault();

        if (this.state.imageName.trim() === '') {
            return toast("Search image name missing");
        }

        this.props.onSubmit(this.state.imageName);
        this.setState({imageName:''});
    }
  
    render () {
      return (
        <header className={s.Searchbar}>
            <form onSubmit={this.handleSubmit} className={s.SearchForm}>
                <button type="submit" className={s.SearchFormButton}>
                    <MdSearch className={s.SearchFormButtonLabel} />
                </button>
            
                <input
                    type="text"
                    name="imageName"
                    value={this.state.imageName}
                    className={s.SearchFormInput}
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                    onChange={this.handleNameChange}
                />
            </form>
        </header>
      );
    }
  };