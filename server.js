const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const signin=require('./controllers/signin');
const register=require('./controllers/register');
const profile=require('./controllers/profile');
const image=require('./controllers/image');

const postgres_db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : '0106',
      database : 'smart_brain_db'
    }
  });
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.json('it is working!!yayyyy');
});

app.post('/signin', (req,res) =>{ signin.handleSignin(req,res,postgres_db,bcrypt)});
app.post('/register',(req,res) =>{  register.handleRegister(req,res,postgres_db,bcrypt)});
app.get('/profile:id',(req,res) =>{  profile.handleProfile(req,res,postgres_db)});
app.put('/image',(req,res) =>{  image.handleImage(req,res,postgres_db)});
app.post('/imageurl',(req,res) =>{  image.handleImageUrl(req,res)});



app.listen(procee.env.PORT || 3001, ()={
  console.log(`it is working${process.env.PORT}`)
}); 

