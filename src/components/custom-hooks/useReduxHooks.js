import {useSelector, useDispatch} from 'react-redux'

export function useSelectorWrapper(selector) {
    return useSelector(state => selector(state))
}

export function useDispatchWrapper(action, payload) {
    const dispatch = useDispatch()
    dispatch(action(payload))
}
