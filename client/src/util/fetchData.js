export default async function fetchData(url, setLoading, setError) {
  try {
    const fetchUrl = url
    const res = await fetch(fetchUrl)
    setLoading(true)

    const data = await res.json()

    setLoading(false)

    return data
  } catch (err) {
    console.log(err.TypeError)
    setLoading(false)
    setError(err.TypeError)
  }
}
