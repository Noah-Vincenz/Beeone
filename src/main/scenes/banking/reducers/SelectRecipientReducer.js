export const selectRecipientReducer = (prevState, action) => {
    switch (action.type) {
      case 'LOAD_COUNTERPARTIES':
        return {
          ...prevState,
          counterParties: action.counterParties,
          isLoading: false,
        };
    }
};

export const initialState = {
    isLoading: true,
    counterParties: [],
};