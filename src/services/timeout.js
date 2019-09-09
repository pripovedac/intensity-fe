export default function removeLoadingState(setLoading) {
    setTimeout(() => {
        setLoading(false)
    }, 200)
}
