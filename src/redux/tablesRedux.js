import { API_URL } from "../config";

//selectors
export const getAllTables = state => state.tables;
export const getTableById = ({ tables }, id) => tables.find(table => table.id === id);


// actions
const createActionName = actionName => `app/posts/${actionName}`;
const UPDATE_TABLES = createActionName('UPDATE_TABLES')
const UPDATE_TABLE_INFO = createActionName('UPDATE_TABLE_INFO')
const ADD_TABLE = createActionName('ADD_TABLE')
const REMOVE_TABLE = createActionName('REMOVE_TABLE')



// action creators
export const updateTables = payload => ({ type: UPDATE_TABLES, payload });
export const updateTableInfo = payload => ({ type: UPDATE_TABLE_INFO, payload });
export const addTable = payload => ({ type: ADD_TABLE, payload })
export const removeTable = payload => ({ type: REMOVE_TABLE, payload })


export const fetchTables = () => {
  return (dispatch) => {
    fetch(API_URL + '/tables')
      .then(res => {
        if (res.status === 200) {
          return res.json()
            .then(tables => dispatch(updateTables(tables)))
        }
      });
  }
};

export const updateTableInfoRequest = (updatedTableInfo) => {
  return (dispatch) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: updatedTableInfo.id,
        status: updatedTableInfo.status,
        peopleAmount: parseInt(updatedTableInfo.peopleAmount),
        maxPeopleAmount: parseInt(updatedTableInfo.maxPeopleAmount),
        bill: parseInt(updatedTableInfo.bill)
      }),
    };

    fetch(API_URL + '/tables/' + updatedTableInfo.id, options)
      .then(() => dispatch(updateTableInfo(updatedTableInfo)))
  }
}

export const addTableRequest = (newTableInfo) => {
  return (dispatch) => {
    console.log(newTableInfo)
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newTableInfo),
    };

    fetch(API_URL + '/tables', options)
      .then(() => dispatch(addTable(newTableInfo)))
  }
}

export const removeTableRequest = (tableId) => {
  return (dispatch) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      // body: JSON.stringify(newTableInfo),
    };

    fetch(API_URL + '/tables/' + tableId, options)
      .then(() => dispatch(removeTable(tableId)))
  }
}





const tablesReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_TABLES:
      return [...action.payload]
    case UPDATE_TABLE_INFO:
      return statePart.map(table => table.id === action.payload.id ? { ...table, ...action.payload } : table)
    case ADD_TABLE:
      return [...statePart, { ...action.payload }]
    case REMOVE_TABLE:
      return [statePart.filter(table => table.id !== action.payload)]
    default:
      return statePart;
  };
};

export default tablesReducer;