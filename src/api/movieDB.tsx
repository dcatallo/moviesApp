import axios from 'axios';

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '31b74337ab012139e8c72cc3f8756d40',
        language: 'es-ES'
    }
})

export default movieDB;