import Client from '../models/clientModel.js'
import data from '../data/clients.js'

const client = new Client({ firstName: data[0]['first_name'] })
  .save()
  .catch((err) => {
    console.log(err)
  })
