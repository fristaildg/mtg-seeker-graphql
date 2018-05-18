import axios from 'axios';

export const getUsersSuccess = (users) => {
  return {
    type: 'get_users_success',
    users
  }
};

export const getUsers = (url, query) => {
  return (dispatch) => {

    axios.post(url, query)
      .then(result => {
        console.log(result.data.data.viewer.allUsers.edges);
        dispatch(getUsersSuccess(result.data.data.viewer.allUsers.edges));
      })
  }
};