import axios from 'axios'
import { store } from '../store'

// Request interceptor
axios.interceptors.request.use(request => {
	const token = store.getters['auth/token']

	if (token) {
		request.headers.common.Authorization = `Bearer ${token}`
	}

	const locale = store.getters['language']
	if (locale) {
		request.headers.common['Accept-Language'] = locale
	}

	// request.headers['X-Socket-Id'] = Echo.socketId()

	return request
})

// Response interceptor
axios.interceptors.response.use(response => response, error => {
	return Promise.reject(error)
})
