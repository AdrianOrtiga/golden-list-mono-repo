import axios from "axios";
import getDataBaseUrl from "./DB";
const baseUrl = `${getDataBaseUrl()}api/notes`

let token = null

async function getAllNotes () {
  const req = axios.get(baseUrl, getHeadersForAuth({ token }))
  return req.then(res => res.data)
}

async function create (newNote) {
  const req = axios.post(baseUrl, newNote, getHeadersForAuth({ token }))
  return req.then(res => res.data)
}

async function update (id, newNote) {
  const req = axios.put(`${baseUrl}/${id}`, newNote, getHeadersForAuth({ token }))
  return req.then(res => res.data)
}

function setToken (newToken) {
  token = `Bearer ${newToken}`
}

function getHeadersForAuth () {
  const config = {
    headers: {
      'authorization': token
    }
  }

  return config
}

export default {
  getAllNotes,
  create,
  update,
  setToken
}