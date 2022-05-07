import axios from "axios"
import getDataBaseUrl from "./DB";
const baseUrl = `${getDataBaseUrl()}api/login`

export default async function login (credentials) {
  const { data } = await axios.post(baseUrl, credentials)
  return data
}