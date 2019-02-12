
const handleSignin = (req,res,postgres_db,bcrypt) =>{

   if(!req.body.email || !req.body.password){
        return res.status(400).json('empty field signin');
    }

    postgres_db.select('email','hash').from('login')
    .where('email','=',req.body.email)
    .then(data=>{
        const isValid= bcrypt.compareSync(req.body.password,data[0].hash);

        console.log(isValid);
        if(isValid){
            return postgres_db.select('*').from('users')
            .where('email','=',req.body.email)
            .then(user=> {res.json(user[0])})
            .catch(err=> res.json('unable to get user'))
        }
        else{
            res.status(400).json('wrong credentials');
        }
    }) 
    .catch(err=> res.status(400).json('wrong credential'));


}

module.exports={
    handleSignin : handleSignin
};

// app.post('/signin',(req,res)=>{
//     if((req.body.email === database.users[0].email) &&
//        (req.body.password === database.users[0].password)){
//         res.json(database.users[0]);
//     }
//     else{
//         res.json('wrong password');
//     }   
// });