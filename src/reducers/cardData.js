export const cardDataIsLoading = (state = false, action) => {
  switch(action.type) {
    case 'card_data_is_loading':
      return action.isLoading;
    default: 
      return state;
  }
};

export const cardData = (state = [], action) => {
  switch(action.type) {
    case 'fetch_card_data_success':
      return action.cardData;
    default:
      return state;
  }
};
