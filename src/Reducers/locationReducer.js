

function locations(state = [], action) {

    switch (action.type) {
        case 'ADD_LOCATION':
            action.payload.id = state.length;
            return [...state, action.payload];
        case 'EDIT_LOCATION':
            return [...state].map(
                (content, i) => content.id === action.payload.id ? action.payload : content
            );
        case 'DELETE_LOCATION':
            return [...state].filter( (item, index) => item.id !== action.payload.id);
        default:
            return state
    }
}

export default locations;
