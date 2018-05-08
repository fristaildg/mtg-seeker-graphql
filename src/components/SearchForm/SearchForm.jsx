import React, { Component } from 'react';
import axios from 'axios';
import queryTypes from './queryTypes';
import './SearchForm.css';

const axiosMtgGraphQl = axios.create({
  baseURL: 'https://mtgql.com/v1'
});

class SearchForm extends Component {
  state = {
    searchTerm: '',
    isLoading: false,
    cardData: [],
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
    const {onFetchCardData} = this.props;
    const {searchTerm} = this.state;

    this.setState({isLoading: true});
    axiosMtgGraphQl
      .post('', { query: queryTypes.GET_CARD_BY_CARD_TYPE(searchTerm)})
      .then(result => {
        this.setState({
          isLoading: false,
          cardData: result.data.data.Cards.edges
        });
        if(this.state.cardData.length > 0) {
          onFetchCardData(this.state.cardData);
          this.setState({
            lastCursor: result.data.data.Cards.pageInfo.endCursor,
            hasNextPage: result.data.data.Cards.pageInfo.hasNextPage
          });
        }
      });
  }

  onFetchMore = () => {
    const {onFetchCardData} = this.props;
    const {searchTerm} = this.state;

    this.setState({isLoading: true});
    axiosMtgGraphQl
      .post('', { query: queryTypes.GET_CARD_BY_CARD_TYPE(searchTerm, this.state.lastCursor)})
      .then(result => {
        this.setState({
          isLoading: false,
          cardData: [...this.state.cardData, ...result.data.data.Cards.edges]
        });
        onFetchCardData(this.state.cardData);
        this.setState({
          lastCursor: result.data.data.Cards.pageInfo.endCursor,
          hasNextPage: result.data.data.Cards.pageInfo.hasNextPage
        });
      });
  }

  render() {
    const {searchTerm, isLoading, hasNextPage, lastCursor} = this.state;

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
        </form>
      </div>
    )
  }
}

export default SearchForm;
