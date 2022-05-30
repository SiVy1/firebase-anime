import axios from "axios"
import { useState, useEffect } from "react"

export default function Anime(){
    const [anime, getAnime] = useState([])
    const path = document.location.pathname
    const id = path.replace('/anime/','')
    const id2 = decodeURI(id.toLowerCase())
    console.log(id2)
    useEffect(() => {
        axios.get(`http://localhost:3002/api/anime/name?name=`+id2).then((data)=>{
            console.log(data)
            getAnime(data.data)
        })
    }, [])
    anime.map(item =>{
        if(item.title == id2){
            console.log(item)
        }
    })
    return(
    <div></div>
    )
}