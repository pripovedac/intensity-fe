export default function removeLoadingState(setLoading, time) {
    setTimeout(() => {
        setLoading(false)
    }, time)
}
