import React, {useState, useRef, useCallback} from 'react'
import {useDispatch} from 'react-redux'
import {setImageUrl} from '../../store/actions/image.action'

export default function useHiddenInput() {
    // Relative path from ProfilePicture component.
    const [pictureUrl, setPictureUrl] = useState("../../../../images/no-avatar.png")
    const [picture, setPicture] = useState()
    const inputRef = useRef(null)
    const dispatch = useDispatch()

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
            setPictureUrlWrapper(URL.createObjectURL(image))
            setPicture(image)
        } else {
            alert('Image cannot be larger than 5MB.')
        }
    }

    function setPictureUrlWrapper(url) {
        setPictureUrl(url)
        dispatch(setImageUrl(url))
    }

    const memoizedPictureUrlWrapper = useCallback(
        (url) => setPictureUrl(url), []
    )

    // todo: Explain this "useCallback" problem in your thesis
    /* Whenever I use setPictureUrl I change the picture thus making the app to rerender.
    Everytime app re-renders useHiddenInput is invoked and I get new unique instance
    of the setPictureUrlWrapper function (among all the others).
    But, as the mentioned function is in the dependency array of the useEffect hook, hook will
    also be invoked every time which we do not want to. */

    return {
        pictureUrl,
        picture,
        HiddenInput,
        onHiddenInputClick,
        inputRef,
        setPictureUrl: memoizedPictureUrlWrapper
    }
}
