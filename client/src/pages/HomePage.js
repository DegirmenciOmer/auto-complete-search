import React, { useEffect, useState } from 'react'
import { Grid, Loader } from 'semantic-ui-react'
//import SearchForm from '../components/SearchForm'
import Dropdown from '../components/Dropdown'
import fetchData from '../util/fetchData'

const HomePage = () => {
  const [value, setValue] = useState(null)
  const [clients, setClients] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const URL = `http://localhost:5000/search/first_name/?q=${searchQuery}`

  useEffect(() => {
    if (searchQuery.length > 1) {
      fetchData(URL, setLoading, setError).then((data) => {
        !data ? new Error('Oops...') : setClients(data)
      })
    } else {
      return
    }
  }, [searchQuery])

  const onChange = (val) => setValue(val)

  return (
    <div className='centered'>
      <Grid.Row></Grid.Row>
      <Grid.Row>
        <Dropdown
          options={clients}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          prompt='Search...'
          onChange={onChange}
          value={value}
        />
      </Grid.Row>

      {loading && (
        <Grid.Row>
          <Loader active inline='centered' />
        </Grid.Row>
      )}
      {error && <p>{error}</p>}
    </div>
  )
}

export default HomePage
