import { useEffect } from "react"
import { useState } from "react"
import movieDB from "../api/movieDB"
import { Movie, MovieDBResponse } from "../interfaces/movieInterface"


interface moviesState {
    nowPlaying: Movie[],
    populars: Movie[],
    topRated: Movie[],
    upComing: Movie[]
}

export const useMovies = () => {
    
    const [isLoading, setIsLoading] = useState(true);
    const [moviesState, setMoviesState] = useState<moviesState>({
        nowPlaying: [],
        populars: [],
        topRated: [],
        upComing: []
    });    
 
    const getMovies = async () => {
        const nowPlayingPromise = movieDB.get<MovieDBResponse>('/now_playing');
        const popularsPromise   = movieDB.get<MovieDBResponse>('/popular');
        const topRatedPromise   = movieDB.get<MovieDBResponse>('/top_rated');
        const upComingPromise   = movieDB.get<MovieDBResponse>('/upcoming');
        
        const resps = await Promise.all([
            nowPlayingPromise, 
            popularsPromise, 
            topRatedPromise, 
            upComingPromise
        ])

        setMoviesState({
            nowPlaying: resps[0].data.results,
            populars: resps[1].data.results,
            topRated: resps[2].data.results,
            upComing: resps[3].data.results
        })

        setIsLoading(false)
    }

    useEffect(() => {
        //now_playing
        getMovies();
    }, [])
            
    return {...moviesState, isLoading}
}


