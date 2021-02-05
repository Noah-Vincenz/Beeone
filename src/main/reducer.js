export const reducer = (prevState, action) => {
    switch (action.type) {
      case 'RESTORE_TOKEN':
        return {
          ...prevState,
          obpToken: action.obpToken,
          isLoading: false,
        };
      case 'SIGN_IN':
        return {
          ...prevState,
          isSignout: false,
          obpToken: action.obpToken,
        };
      case 'SIGN_OUT':
        return {
          ...prevState,
          isSignout: true,
          obpToken: null,
        };
    }
};

export const initialState = {
    isLoading: true,
    isSignout: false,
    obpToken: null,
};