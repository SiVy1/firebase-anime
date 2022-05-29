import React from 'react';
// import { Link } from 'react-router';
import { useState, useEffect, useRef, useCallback } from 'react';
import { auth } from '../service/firebase'
import '../App.css';
import axios from 'axios';
import useAnimeSearch from './useAnimeSearch';
import './style/home.css'
const Home = ({ user }) => {
  const [pageNumber, setPageNumber] = useState(1)
  const {
    anime,
    hasMore,
    loading,
    error
  } = useAnimeSearch(pageNumber)
  
  const observer = useRef()
  const lastAnimeElement = useCallback(node =>{ 
    if (loading) return 
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting){
        setPageNumber(prevPageNumber => prevPageNumber + 1)
        console.log(pageNumber)
      }
    })
    if(node) observer.current.observe(node)
  }, [loading, hasMore])

    const [searchWord, setSearchWord] = useState('')
    const [searchedAnime, setSearchedAnime] = useState([])
    useEffect(()=>{
        if(searchWord.length > 3){
        axios.get(`http://localhost:3002/api/anime/name?name=`+searchWord).then((data)=>{
            console.log(data)
            setSearchedAnime(data.data)
        })
      }
    },[searchWord])

  return (
    <div className="home">
      <div className='anime-root'>
      {anime.map((item, index) => {
        if(anime.length === index + 1){
        return(
        <div className='anime-con' key={item.title} ref={lastAnimeElement}>
              <div className='anime-pic'>
                <img src={item.picture} />
              </div>
              <div className='anime-title'>
                <span>{item.title}</span>
              </div>
          </div>
        )
        }else{
        return(
            <div className='anime-con' key={item.title}>
              <div className='anime-pic'>
                <img src={item.picture} />
              </div>
              <div className='anime-title'>
                <span>{item.title}</span>
              </div>
          </div>
        )
      }})}
      <div>{loading && 'Loading...'}</div>  
      <div>{error && 'Error'}</div>  
      </div>
      <div className='search'>
      <input onChange={event => setSearchWord(event.target.value)}></input>
      <div className='searched-anime-con' >
          {searchedAnime.slice(0, 15).map(item =>{
            return (
                  <div className="searched-anime" key={item.title}>
                    <img src={item.picture} />
                    <a href={item.title}>{item.title}</a>
                  </div>
            )
        })}
        </div>
      </div>
    </div>
  )
}

export default Home;