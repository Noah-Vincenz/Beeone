export const addAccountReducer = (prevState, action) => {
    switch (action.type) {
      case 'LOAD_BANKS':
        return {
          ...prevState,
          banks: action.banks,
          isLoading: false,
        };
    }
};

export const initialState = {
    isLoading: true,
    banks: [],
};