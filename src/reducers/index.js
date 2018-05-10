import {combineReducers} from 'redux';
import {cardData, cardDataIsLoading} from './cardData';

export default combineReducers({
  cardData,
  cardDataIsLoading
});