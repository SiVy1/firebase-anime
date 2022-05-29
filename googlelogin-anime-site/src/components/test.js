import Axios from 'axios'
import React,{useEffect,useState} from 'react'
import {useParams} from "react-router-dom"
import './style/navbar.css'
export default function Test(){

    const [serachWord, setSearchWord] = useState('')
    const [searchedAnime, setSearchedAnime] = useState([])
    useEffect(()=>{
          console.log('dlugosc='+serachWord.length)
        if(serachWord.length > 3)
        Axios.get(`http://localhost:3002/api/anime/name?name=`+serachWord).then((data)=>{
            console.log(data)
            setSearchedAnime(data.data)
    })},[serachWord])
    

    return(
        <div>
        <input onChange={event => setSearchWord(event.target.value)}></input>
        {searchedAnime.slice(0, 15).map(item =>{
            return (
                <div key={item.title}>
                    {item.title}
                </div>
            )
        })}
      </div>
    )
}
