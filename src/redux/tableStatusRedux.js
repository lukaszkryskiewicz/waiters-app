//selectors
export const getStatusList = state => state.tableStatus;


// actions
const createActionName = actionName => `app/posts/${actionName}`;
const UPDATE_STATUS = createActionName('UPDATE_STATUS')


// action creators
export const updateStatus = payload => ({ type: UPDATE_STATUS, payload });
export const fetchStatus = () => {
  return (dispatch) => {
    fetch('http://localhost:3131/api/tableStatus')
      .then(res => {
        console.log(res.status)
        if (res.status === 200) {
          return res.json()
            .then(statusList => dispatch(updateStatus(statusList)))
        }
      });
  }
};


const tableStatusReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_STATUS:
      return [...action.payload]
    default:
      return statePart;
  };
};

export default tableStatusReducer;