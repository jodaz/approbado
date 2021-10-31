const dataInitialState = {
    names: '',
    email: '',
    provider: '',
    key: '',
    external: true
}

const reducer = (state = {
    isFilled: false,
    data: dataInitialState
}, action) => {
    switch (action.type) {
        case "SET":
            return {
                ...state,
                isFilled: !state.isFilled,
                data: { ...state.data, ...action.payload }
            };
        case "UNSET":
            return {
                ...state,
                isFilled: !state.isFilled,
                data: dataInitialState
            };
        default:
            return state;
    }
}

export const set = data => ({
    type: 'SET',
    payload: data
})

export const unset = () => ({
    type: 'SET'
})

export default reducer
