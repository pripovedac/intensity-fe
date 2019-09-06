import React, {useState, useRef} from 'react'

export default function useHiddenInput() {
    // Relative path from ProfilePicture component.
    const [pictureUrl, setPictureUrl] = useState("../../../../images/no-avatar.png")
    const [picture, setPicture] = useState()
    const inputRef = useRef(null)

    function HiddenInput() {
        return (
            <label aria-label="file-input">
                <input
                    type="file"
                    ref={inputRef}
                    onChange={onChange}
                    style={{opacity: 0}}
                    accept="image/*"
                />
            </label>
        )
    }

    const onHiddenInputClick = () => {
        inputRef.current.click()
    }

    function onChange(event) {
        const image = event.target.files[0]
        const fiveMB = 1024 * 1024 * 5
        if (image.size < fiveMB) {
            setPictureUrl(URL.createObjectURL(image))
            setPicture(image)
        } else {
            alert('Image cannot be larger than 5MB.')
        }
    }

    return {
        pictureUrl,
        picture,
        HiddenInput,
        onHiddenInputClick,
        inputRef,
        setPictureUrl,
    }
}
