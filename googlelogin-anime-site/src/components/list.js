import { auth } from '../service/firebase'
import React from 'react';
import '../App.css';

function List({user}){
    console.log(user)
    return (
      <div className="home">
        <h1>Hello list, <span></span>{user.displayName}</h1>
        <img src={user.photoURL} alt="" />
        <button className="button signout" onClick={() => auth.signOut()}>Sign out</button>
      </div>
    )
  }

export default List;