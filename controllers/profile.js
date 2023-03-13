const handleProfile = (req,res,postgres_db) =>{

if(postgres_db){
   postgres_db.select('*').from('users').where({
        id: req.params.id
    })
    .then(user => {
        if(user.length){res.json(user[0])}
        else{res.status(400).json('not found')}})
    .catch(err => res.status(400).json('error getting user profile'));    
}
else{
    res.json('success');
}

}
module.exports={
    handleProfile : handleProfile
};

