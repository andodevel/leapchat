export default function userReducer(state={
	username: ''
}, action){
  switch (action.type){
    case "SET_USERNAME": {
      return Object.assign({},
                           state,
                           {username: action.payload });
      break;
    }
    case "SET_USERS": {
      return Object.assign({},
                           state, 
                           {users: action.payload });
      break;
    }
  }
  return state;
}