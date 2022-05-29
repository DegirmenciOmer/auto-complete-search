import React, { useEffect, useState } from 'react'
import { Grid, Loader } from 'semantic-ui-react'
import ClientCard from '../components/ClientCard'
//import SearchForm from '../components/SearchForm'
import Dropdown from '../components/Dropdown'
import fetchData from '../util/fetchData'

const HomePage = () => {
  const [value, setValue] = useState(null)
  const [clients, setClients] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const URL = `http://localhost:8000/search/first_name/?q=${searchQuery}`

  useEffect(() => {
    if (searchQuery.length > 0) {
      fetchData(URL, setLoading, setError).then((data) => {
        !data ? new Error('Oops...') : setClients(data)
      })
    } else if (searchQuery.length === 0) {
      setClients('')
    } else {
      return
    }
  }, [searchQuery])

  return (
    <div className='centered'>
      <Grid.Row>
        <Dropdown
          options={clients}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          prompt='Search...'
          setValue={setValue}
          onChange={(val) => setValue(val)}
          value={value}
        />
      </Grid.Row>
      {value && (
        <Grid.Row>
          <ClientCard client={value} />
        </Grid.Row>
      )}

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
