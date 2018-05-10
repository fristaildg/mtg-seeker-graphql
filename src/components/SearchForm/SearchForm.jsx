import React, { Component } from 'react';
// import axios from 'axios';
import queryTypes from './queryTypes';
import './SearchForm.css';
import {connect} from 'react-redux';
import {cardDataFetch} from '../../actions/cardData';

// const axiosMtgGraphQl = axios.create({
//   baseURL: 'https://mtgql.com/v1'
// });

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
    const {cardDataFetch, cardData, onFetchCardData} = this.props;
    const {searchTerm} = this.state;

    cardDataFetch(
      'https://mtgql.com/v1',
      {query: queryTypes.GET_CARD_BY_CARD_TYPE(searchTerm)}      
    )
    onFetchCardData(cardData);

    // this.setState({isLoading: true});
    // axiosMtgGraphQl
    //   .post('', { query: queryTypes.GET_CARD_BY_CARD_TYPE(searchTerm)})
    //   .then(result => {
    //     if(!result) {
    //       this.setState({hasError: true});
    //     }
    //     this.setState({
    //       isLoading: false,
    //       cardData: result.data.data.Cards.edges
    //     });
    //     if(this.state.cardData.length > 0) {
    //       onFetchCardData(this.state.cardData);
    //       this.setState({
    //         lastCursor: result.data.data.Cards.pageInfo.endCursor,
    //         hasNextPage: result.data.data.Cards.pageInfo.hasNextPage
    //       });
    //     }
    //   })
    //   .catch(() => this.setState({hasError: true}));
  }

  // onFetchMore = () => {
  //   const {onFetchCardData} = this.props;
  //   const {searchTerm} = this.state;

  //   // this.setState({isLoading: true});
  //   // axiosMtgGraphQl
  //   //   .post('', { query: queryTypes.GET_CARD_BY_CARD_TYPE(searchTerm, this.state.lastCursor)})
  //   //   .then(result => {
  //   //     this.setState({
  //   //       isLoading: false,
  //   //       cardData: [...this.state.cardData, ...result.data.data.Cards.edges]
  //   //     });
  //   //     onFetchCardData(this.state.cardData);
  //   //     this.setState({
  //   //       lastCursor: result.data.data.Cards.pageInfo.endCursor,
  //   //       hasNextPage: result.data.data.Cards.pageInfo.hasNextPage
  //   //     });
  //   //   });
  // }

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
    isLoading: state.isLoading
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    cardDataFetch: (url, query) => dispatch(cardDataFetch(url, query))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
