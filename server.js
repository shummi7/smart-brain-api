const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');


const signin=require('./controllers/signin');
const register=require('./controllers/register');
const profile=require('./controllers/profile');
const image=require('./controllers/image');

// const postgres_db = knex({
//   client: 'pg',
//   connection: {
//     host : '127.0.0.1',
//     user : 'postgres',
//     password : '****',
//     database : 'smart_brain_db'
//   }
// ,pool: {
//   min: 3,
//   max: 7
// },
// migrations: {
//   tableName: 'mig'
// },
//   acquireConnectionTimeout: 5000
// });

// postgres_db.raw('select 1+1 as result').catch(err => {
//   console.log('eee',err);
//   process.exit(1);
// });

let my_database = {
  users:[{
    id:1,
    name:'guest',
    email:'guest@gmail.com',
    password:'guest',
    joined:'Fri Mar 03 2023 15:28:34 GMT-0600 (Central Standard Time)',
    entries:2
  }]
}

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.get('/',(req,res)=>{
  
    res.json('it is working!!yayyyy');
});

app.post('/signin', (req,res) =>{ signin.handleSignin(req,res,false,bcrypt,my_database)});
app.post('/register',(req,res) =>{  register.handleRegister(req,res,false,bcrypt)});
app.get('/profile:id',(req,res) =>{  profile.handleProfile(req,res,false)});
app.put('/image',(req,res) =>{  image.handleImage(req,res,false,my_database)});
app.post('/imageurl',(req,res) =>{  image.handleImageUrl(req,res,false,my_database)});



app.listen(process.env.PORT || 3001, ()=> {
  console.log(`it is working 30000///////////////////////////////////////////////////////////////////////////////////////////`)
}); 

