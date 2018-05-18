import axios from 'axios';

export const cardDataFetchSuccess = (cardData) => {
  return {
    type: 'fetch_card_data_success',
    cardData
  }
};

export const cardDataIsLoading = (bool) => {
  return {
    type: 'card_data_is_loading',
    isLoading: bool
  }
};

export const cardDataFetch = (url, query) => {
  return (dispatch) => {
    dispatch(cardDataIsLoading(true));

    axios.post(url, query)
      .then(result => {
        dispatch(cardDataIsLoading(false));
        console.log(result);
        dispatch(cardDataFetchSuccess(result.data.data.Cards.edges));
      }
    )      
  }
};

