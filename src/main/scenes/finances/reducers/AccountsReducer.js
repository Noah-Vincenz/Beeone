export const accountsReducer = (prevState, action) => {
    switch (action.type) {
      case 'LOAD_ACCOUNTS':
        return {
          ...prevState,
          accounts: action.listOfAccounts,
          isLoading: false,
        };
    }
};

export const initialState = {
    isLoading: true,
    accounts: [],
};