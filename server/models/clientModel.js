import mongoose from 'mongoose'

const clientSchema = new mongoose.Schema({})

const Client = mongoose.model('clients', clientSchema)

export default Client
