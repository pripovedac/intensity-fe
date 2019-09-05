import React, {useState, useRef} from 'react'

export default function useHiddenInput() {
    const [pictureUrl, setPictureUrl] = useState()
    const ref = useRef(null)

    function HiddenInput() {
        return (
            <label aria-label="file-input">
                <input
                    type="file"
                    ref={ref}
                    onChange={onChange}
                    style={{display: 'none'}}
                />
            </label>
        )
    }

    const onHiddenInputClick = () => {
        ref.current.click()
    }

    function onChange(event) {
        setPictureUrl(URL.createObjectURL(event.target.files[0]))
    }

    return {
        pictureUrl,
        HiddenInput,
        onHiddenInputClick,
    }
}
