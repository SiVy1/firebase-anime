import './style/profile.css'
import React, { useEffect, useState, Component } from "react";
import axios from 'axios';

export default function Profile({ user }){
    const path = document.location.pathname
    const id = path.replace('/profile/','')
    const [profile,setProfile] = useState({})
    const [posts, setPost] = useState()
    function wait(ms) {
        return new Promise( (resolve) => {setTimeout(resolve, ms)});
    }
    useEffect(()=>{
        axios.get(`http://localhost:3002/api/getFromId/`+id).then((data)=>{
            // console.log(data)
        setProfile({
                username: data.data[0].UserName,
                profileimg: data.data[0].profilePic,
                episodeCount: data.data[0].episodeCount,
                watchedAnime: data.data[0].watchedAnime,
                lastAnime: data.data[0].lastAnime,
                daysWatched: data.data[0].daysWatched
         });
        })
        axios.get('http://localhost:3002/api/getPost/'+id).then((data) =>{
        const arr = data.data
        console.log(arr)
        setPost(arr.map((item) => {
            console.log(item)
            return(
                <div className='anime-post'>
                    <div className='post-content'>
                        <span className='post-text'>{item.postContent}</span>
                        <img src={item.postPictrue} className='post-pic'></img>
                    </div>
                </div>
            )
            return(
                <div>{item.userName}</div>
            )
         }))
        })
    }, [])
// console.log(posts)
    
    return(
        <div className="container">
            <div className='background-photo'>
                <img src='https://img.freepik.com/darmowe-wektory/szczegolowy-szablon-banera-anime_52683-66691.jpg?w=2000'></img>
            </div>
            <div className="prof-card">
                <div className="photo-card">
                    <img src={profile.profileimg} />
                    <span className='user-name'>{profile.username}</span>
                </div>
            </div>
            <div className='anime-info'>
                <div className="anime-stats">
                    <span>Anime stats</span>
                    <div className='anime-stats-con'>
                        <div className='stats-name'>
                            <span className='span-stats col1stats'>Watched anime</span>
                            <span className='span-stats col2stats'>Episode count</span>
                            <span className='span-stats col3stats'>Last anime</span>
                            <span className='span-stats col4stats'>Days watched</span>
                        </div>
                        <div className='stats'><br></br>
                            <span className='span-stat col1stats'>{profile.watchedAnime}</span>
                            <span className='span-stat col2stats'>{profile.episodeCount}</span>
                            <span className='span-stat col3stats'>{profile.lastAnime}</span>
                            <span className='span-stat col4stats'>{profile.daysWatched}</span>
                        </div>
                    </div>
                </div>
                <div className="anime-activity">
                    <span className='last-activity'>Ostatnia aktywnosc</span>
                    {posts}
                </div>
                </div>
            </div>
    )
}