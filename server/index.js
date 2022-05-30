const express = require('express');
const db = require('./config/db')
const cors = require('cors')
const anime = require('./anime.json')
const app = express();
const  PORT = 3002;
app.use(cors());
app.use(express.json())
const fs = require('fs');
const res = require('express/lib/response');

// Route to get all posts
app.get("/api/get", (req,res)=>{
db.query("SELECT * FROM `user`", (err,result)=>{
    if(err) {
    console.log(err)
    } 
res.send(result)
});   });

// Route to get one post
app.get("/api/getFromId/:id", (req,res)=>{

const id = req.params.id;
 db.query("SELECT * FROM user WHERE UID = ?", id, 
 (err,result)=>{
    if(err) {
    console.log(err)
    } 
    res.send(result)
    });   
});
app.get('/api/anime', (req, res) =>{
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const animeResults = anime.data.slice(startIndex, endIndex)
    res.send(animeResults)
})

app.get('/api/getPost/:id', (req, res) => {
    const id = req.params.id
    db.query('SELECT * FROM `posts` WHERE `userUID` = ?', [id], (err, result) =>{
        if(err){
            console.log(err)
        }
        res.send(result)
    })
})
app.post('/api/avatar', (req, res) => {
    const id = req.body.user.uid
    const avatar = req.body.newAvatar
    function isImage(url) {
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
      }
    const validAvatar = isImage(avatar)
    if(validAvatar == true){
        db.query('UPDATE `user` SET `profilePic`=? WHERE `ID` = ?', [avatar, id])
    }
})
// Route for creating the post
app.post('/api/create', (req,res)=> {
const username = req.body.user.displayName;
const id = req.body.user.uid;
const profilePic = req.body.user.photoURL;
    db.query("SELECT * FROM user WHERE ID = ?;",[id], function (err, result, fields) {
     if (err) throw err;
        console.log(result);
        if(result == null || result.length === 0){
        db.query("INSERT INTO user (ID, UserName, profilePic) VALUES (?,?,?)",[id,username,profilePic], (err,result)=>{
            if(err) {
            console.log(err)
            } 
            console.log(result)
        });  
    }})
})

// Route to delete a post

app.delete('/api/delete/:id',(req,res)=>{
const id = req.params.id;

db.query("DELETE FROM posts WHERE id= ?", id, (err,result)=>{
if(err) {
console.log(err)
        } 
    }) 
})
app.get('/api/anime/name', (req, res) =>{
    const name = req.query.name
    
    const animeResults = anime.data.filter(word => word.title.toLowerCase().indexOf(name) > -1)

    res.send(animeResults)
})
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})
