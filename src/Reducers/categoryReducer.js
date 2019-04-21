

function categories(state = [], action) {

    switch (action.type) {
        case 'ADD_CATEGORY':
            action.payload.id = state.length;
            return [...state, action.payload];
        case 'EDIT_CATEGORY':
            return [...state].map(
                (content, i) => content.id === action.payload.id ? action.payload : content
            );
        case 'DELETE_CATEGORY':
            return [...state].filter( (item, index) => item.id !== action.payload.id);
        default:
            return state
    }
}

export default categories;
