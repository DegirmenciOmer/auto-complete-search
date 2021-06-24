import React, { useEffect, useState } from 'react'
import { Grid, Loader } from 'semantic-ui-react'
//import ClientCard from '../components/ClientCard'
import SearchForm from '../components/SearchForm'
import fetchData from '../util/fetchData'

const HomePage = () => {
  const [clients, setClients] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const URL = `http://localhost:5000/search?q=${searchQuery}`

  useEffect(() => {
    if (searchQuery.length > 1) {
      fetchData(URL, setLoading, setError).then((data) => {
        !data ? new Error('Oops...') : setClients(data.results)
      })
    } else {
      return
    }
  }, [searchQuery])

  return (
    <div className='centered'>
      <Grid.Row>
        <SearchForm searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </Grid.Row>

      {loading && (
        <Grid.Row>
          <Loader active inline='centered' />
        </Grid.Row>
      )}
      {error && <p>{error}</p>}

      {clients && (
        <ul>
          {clients.map((client) => {
            return <li>{client.first_name}</li>
          })}
        </ul>
      )}
    </div>
  )
}

export default HomePage
