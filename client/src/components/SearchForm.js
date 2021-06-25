import React from 'react'
import { Form } from 'semantic-ui-react'

const SearchForm = ({ searchQuery, setSearchQuery }) => {
  function onChange(e) {
    setSearchQuery(e.target.value)
  }

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Input
            placeholder='Search for options'
            name='name'
            value={searchQuery}
            onChange={onChange}
            autoComplete='off'
          />
        </Form.Group>
      </Form>
    </>
  )
}

export default SearchForm
