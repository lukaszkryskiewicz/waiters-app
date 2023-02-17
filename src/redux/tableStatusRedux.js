//selectors
export const getAllStatus = state => state.status;


const tableStatusReducer = (statePart = [], action) => {
  switch (action.type) {
    default:
      return statePart;
  };
};

export default tableStatusReducer;