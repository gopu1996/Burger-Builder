import axios from 'axios'

const instance = axios.create({
    baseURL:'https://react-my-buger-a5993.firebaseio.com/'
})

export default instance