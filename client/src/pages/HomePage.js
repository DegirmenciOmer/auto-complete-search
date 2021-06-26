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
      <Grid.Row></Grid.Row>
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

      <a
        target='_blank'
        href='https://www.youtube.com/watch?v=elC357w9VOA&t=1237s'
      >
        tutorial
      </a>

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
