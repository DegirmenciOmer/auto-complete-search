import React, { useEffect, useState } from 'react'
import { Loader } from 'semantic-ui-react'
import ClientCard from '../components/ClientCard'
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
  console.log(error)

  return (
    <div className='centered'>
      <div>
        <Dropdown
          options={clients}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          prompt='Search...'
          setValue={setValue}
          onChange={(val) => setValue(val)}
          value={value}
        />
      </div>
      {value && (
        <div>
          <ClientCard client={value} />
        </div>
      )}

      {loading && (
        <div>
          <Loader active inline='centered' />
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  )
}

export default HomePage
