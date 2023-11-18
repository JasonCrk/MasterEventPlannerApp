import axios from 'axios'

import config from '../config'

export const authBaseEndpoint = axios.create({
  baseURL: config.BASE_API_URL + '/auth',
})

export const accountBaseEndpoint = axios.create({
  baseURL: config.BASE_API_URL + '/accounts',
})

export const eventBaseEndpoint = axios.create({
  baseURL: config.BASE_API_URL + '/events',
})

export const connectionBaseEndpoint = axios.create({
  baseURL: config.BASE_API_URL + '/connections',
})

export const categoryBaseEndpoint = axios.create({
  baseURL: config.BASE_API_URL + '/categories',
})
