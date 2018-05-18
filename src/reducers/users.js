export const users = (state = [], action) => {
  switch(action.type) {
    case 'get_users_success':
      return action.users;
    default:
      return state;
  }
};