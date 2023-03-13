
const handleSignin = (req,res,postgres_db,bcrypt,my_database) =>{

   if(!req.body.email || !req.body.password){
        return res.status(400).json('empty field signin');
    }

    if(postgres_db){
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
 else{
    res.json(my_database.users[0])
 }
}

module.exports={
    handleSignin : handleSignin
};

