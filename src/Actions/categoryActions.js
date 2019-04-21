



 export const addCategory = (data) => dispatch => {
 dispatch({
  type: 'ADD_CATEGORY',
  payload: data
 })
};


 export const editCategory = (data) => dispatch => {
  dispatch({
   type: 'EDIT_CATEGORY',
   payload: data
  })
 };


 export const deleteCategory = (data) => dispatch => {
  dispatch({
   type: 'DELETE_CATEGORY',
   payload: data
  })
 };
