import axios  from 'axios'

export const URL='http://localhost:5000/api'
export const URL_IMG='http://localhost:5000'


export const fetchuser = ()=> axios.get(`${URL}/user`)
export const getproducts = ()=> axios.get(`${URL}/product`)



export const createpost = (payload)=> axios.post(`${URL}/user/createuser`,payload)
