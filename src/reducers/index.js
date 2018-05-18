import {combineReducers} from 'redux';
import {cardData, cardDataIsLoading} from './cardData';
import {users} from './users';

export default combineReducers({
  cardData,
  cardDataIsLoading,
  users
});