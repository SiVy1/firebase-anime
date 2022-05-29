import "./style/navbar.css";
import React, { useEffect, useState } from "react";
import { auth } from '../service/firebase'
import axios from "axios";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

export default function Navbar({ user }) {
  const [avatar, isAvatar] = useState(false)
  function avatarClicked(){
    isAvatar(prevState => !prevState)
    console.log(avatar)
  }
  const style = {
    visibility: avatar ? 'visible' : "hidden"
  }

  const handle = useFullScreenHandle();
  function avatarChange(){
    const newAvatar = prompt('Avatar:')
    console.log(newAvatar)
    axios.post('http://localhost:3002/api/avatar', {newAvatar, user})
  
  }
  
  return (
    <nav className="navbar-con">
      <div className="nav-menu">
        <a href="/">Main</a>
        <a href="/list">List</a>
        <a href="/profile">Profile</a>
  
      </div>
      <div className="nav-photo" onMouseEnter={avatarClicked} onMouseLeave={avatarClicked}>
        <img src={user.photoURL} alt=""/>
        <div className='logout-button slide-in-top' style={style}>
          <button className="button-signout" onClick={() => auth.signOut()}>Wyloguj</button>
          <button className="button-signout" onClick={avatarChange}>Zmien avatar</button>
        </div>
      </div>
    </nav>
  );
}
