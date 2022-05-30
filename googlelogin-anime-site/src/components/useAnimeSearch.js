import axios from 'axios'
// import { set } from 'express/lib/application'
import {useEffect, useState} from 'react'

export default function useAnimeSearch(pageNumber) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [anime, setAnime] = useState([])
    const [hasMore, setHasMore] = useState(false)

    useEffect(() => {
        setLoading(true)
        setError(false)
        let cancel
        axios({
            method:'GET',
            url: 'http://localhost:3002/api/anime',
            params: { page: pageNumber, limit: '40'},
            cancelToken: new axios.CancelToken(c => cancel = c)
        }).then(res => {
            setAnime(prevAnime => {
                return [...new Set([...prevAnime, ...res.data])]
            })
            setHasMore(res.data > 0)
            setLoading(false)
            // console.log(res.data)
        }).catch(e =>{
            if (axios.isCancel(e)) return
            setError(true) 
        })
        return () => cancel()
    }, [pageNumber])
  return {loading, error, anime, hasMore}
}
