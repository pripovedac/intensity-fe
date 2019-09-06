import * as actions from '../actions/image.action'

const initialState = {
    isLoaded: false,
    imageUrl: '',
    mode: 'upload'
}
// Possible modes: ['upload', 'submit']


export default function (state = initialState, action) {
    switch (action.type) {
        case actions.LOAD_STATE_SET: {
            return {
                ...state,
                isLoaded: action.payload
            }
        }

        case actions.IMAGE_URL_SET: {
            return {
                isLoaded: true,
                imageUrl: action.payload,
                mode: 'submit'
            }
        }

        case actions.IMAGE_MODE_SET: {
            return {
                ...state,
                mode: action.payload
            }
        }

        default: {
            return state
        }
    }
}
