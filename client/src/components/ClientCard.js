import React from 'react'

const ClientCard = ({
  client: { first_name, last_name, photo, origin, gender },
}) => {
  return (
    <div className='card'>
      <img src={photo} alt='client avatar' className='photo' />
      <h1>{`${first_name} ${last_name}`}</h1>
      <p>Origin: {origin === null ? 'N/A' : origin}</p>
      <p>Gender: {gender === null ? 'N/A' : gender}</p>
      <p>
        <button>Contact</button>
      </p>
    </div>
  )
}

export default ClientCard
