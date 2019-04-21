
import categories from '../Reducers/categoryReducer';
import locations from '../Reducers/locationReducer';
import { combineReducers,createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';


const reducers = combineReducers({
    categories,
	locations
});

let initialState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) :
	{ categories: [], locations: [ ] };

let store = createStore(
	  reducers,
	  initialState,
	  composeWithDevTools(
	    applyMiddleware(
	      thunk
	    )
	  )
	);
export default store;