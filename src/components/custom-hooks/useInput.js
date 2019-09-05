import {useState} from 'react'

export default function useInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    return {
        value,
        bind: {
            value,
            onChange: event => {
                setValue(event.target.value);
            }
        }
    };
};
