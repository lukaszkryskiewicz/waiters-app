//selectors
export const getAllTables = state => state.tables;
export const getTableById = ({ tables }, id) => tables.find(table => table.id === id)

// actions
const createActionName = actionName => `app/posts/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES')
const UPDATE_TABLE_INFO = createActionName('UPDATE_TABLE_INFO')



// action creators
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });
export const updateTableInfo = payload => ({ type: UPDATE_TABLE_INFO, payload });
export const fetchTables = () => {
  return (dispatch) => {
    fetch('http://localhost:3131/api/tables')
      .then(res => {
        if (res.status === 200) {
          return res.json()
            .then(tables => dispatch(updateTables(tables)))
        }
      });
  }
};

export const updateTableInfoRequest = (newTableInfo) => {
  return (dispatch) => {
    console.log(newTableInfo)
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: newTableInfo.id,
        status: newTableInfo.status,
        peopleAmount: parseInt(newTableInfo.peopleAmount),
        maxPeopleAmount: parseInt(newTableInfo.maxPeopleAmount),
        bill: parseInt(newTableInfo.bill)
      }),
    };

    fetch('http://localhost:3131/api/tables/' + newTableInfo.id, options)
      .then(() => dispatch(updateTableInfo(newTableInfo)))
  }
}



const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return [...action.payload]
    case UPDATE_TABLE_INFO:
      return statePart.map(table => table.id === action.payload.id ? { ...table, ...action.payload } : table)
    default:
      return statePart;
  };
};

export default tablesReducer;