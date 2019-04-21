



 export const addLocation = (data) => dispatch => {
 dispatch({
  type: 'ADD_LOCATION',
  payload: data
 })
};

 export const editLocation = (data) => dispatch => {
  dispatch({
   type: 'EDIT_LOCATION',
   payload: data
  })
 };


 export const deleteLocation = (data) => dispatch => {
  dispatch({
   type: 'DELETE_LOCATION',
   payload: data
  })
 };

