import clientData from '../data/clients.js'

const getClients = (req, res) => {
  res.json(clientData.slice(0, 10))
}

const getClientById = (req, res) => {
  const client = clientData.find((item) => req.params.id === item.id.$oid)
  if (client) {
    res.json(client)
  } else {
    res.status(404)
    res.json({ message: 'Not found' })
    throw new Error({ message: 'Not found' })
  }
}

const searchClient = (req, res) => {
  const { q } = req.query
  console.log(q)

  const output = []
  if (q) {
    clientData.forEach((obj) => {
      obj.first_name.toLowerCase().startsWith(q.toLowerCase()) &&
        output.push(obj)
    })
    res.json(output)
  } else {
    res.sendStatus(404)
  }
}

export { getClients, getClientById, searchClient }
