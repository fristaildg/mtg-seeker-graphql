import React, { Component } from 'react';
// import axios from 'axios';
import queryTypes from './queryTypes';
import './SearchForm.css';
import {connect} from 'react-redux';
import {cardDataFetch} from '../../actions/cardData';
import {getUsers} from '../../actions/users';

const queryURL = 'https://mtgql.com/v1';
const usersQueryURL = 'https://us-west-2.api.scaphold.io/graphql/mtg-ql';

class SearchForm extends Component {
  state = {
    searchTerm: '',
    // isLoading: false,
    hasError: false,
    // cardData: [],
    lastCursor: '',
    hasNextPage: true
  }

  handleOnChange = event => {    
    this.setState({searchTerm: event.target.value})
  }

  handleOnSubmit = event => {
    event.preventDefault();
    this.onFetch();
  }

  handleShowMoreClick = event => {
    event.preventDefault();
    this.onFetchMore();
  }

  onFetch = () => {
    const {cardDataFetch, getUsers} = this.props;
    const {searchTerm} = this.state;

    cardDataFetch(
      queryURL,
      {query: queryTypes.GET_CARD_BY_NAME(searchTerm)}
    )

    getUsers(
      usersQueryURL,
      {query: queryTypes.GET_USERS()}
    )
  }

  render() {
    const {
      searchTerm,
      hasNextPage,
      lastCursor,
      hasError
    } = this.state;

    const {
      isLoading
    } = this.props;

    return (
      <div className="search-form-container">
        <form onSubmit={this.handleOnSubmit}>
          <input placeholder="search for a card"
            type="text"
            id="searchCard"
            onChange={this.handleOnChange}
            value={searchTerm}
            className="form-input"
          />
          <input type="submit"
            value="Seach"
            className="form-submit"
          />
          {
            lastCursor !== '' && hasNextPage ? (
              <button onClick={this.handleShowMoreClick}
                className="form-show-more"
              >
                more
              </button>
            ) : null
          }
          {
            isLoading ? (
              <span className="loader"></span>
            ) : null
          }
          {
            hasError ? (
              <span className="error-msg">
                Error fetching data!
              </span>
            ) : null
          }
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cardData: state.cardData,
    isLoading: state.isLoading,
    users: state.users
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    cardDataFetch: (url, query) => dispatch(cardDataFetch(url, query)),
    getUsers: (url, query) => dispatch(getUsers(url, query))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
