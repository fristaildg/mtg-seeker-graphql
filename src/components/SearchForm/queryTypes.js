const queryTypes = {
  GET_CARD_BY_NAME: name => {
    return `
      {
        Cards(filter: {nameLike: "${name}"}) {
          edges {
            node {
              id
              name
              cmc
              cardType
              text
              artist {
                identifier
              }
              colors {
                identifier
              }
            }
          }
        }
      }
    `
  },
  GET_CARD_BY_CARD_TYPE: (cardType, cursor) => {
    const capitalize = string => {
      return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
    };
    const value = capitalize(cardType);
    return `
      {
        Cards(filter: {type: "${value}"}, first: 5, after: "${cursor}") {
          pageInfo {
            endCursor
            hasNextPage
          }
          edges {
            cursor
            node {
              id
              name
              cmc
              cardType
              text
              artist {
                identifier
              }
              colors {
                identifier
              }
            }
          }
        }
      }
    `
  },
  GET_USERS: () => {
    return `
      {
        viewer {
          allUsers {
            edges {
              node {
                id
                username
              }
            }
          }
        }
      }
    `
  }
}

export default queryTypes;
