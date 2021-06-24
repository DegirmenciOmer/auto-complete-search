export default async function fetchData(url, setLoading, setError) {
  try {
    const fetchUrl = `${url}`
    const res = await fetch(fetchUrl)
    setLoading(true)

    // if (!res.ok) {
    //   setLoading(false)
    //   throw new Error('Something went wrong...')
    // }

    const data = await res.json()
    console.log(data)

    setLoading(false)

    return data
  } catch (err) {
    console.log({ err })
    setLoading(false)
    setError(err)
  }
}
