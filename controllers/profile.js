const handleProfile = (req,res,postgres_db) =>{


   postgres_db.select('*').from('users').where({
        id: req.params.id
    })
    .then(user => {
        if(user.length){res.json(user[0])}
        else{res.status(400).json('not found')}})
    .catch(err => res.status(400).json('error getting user profile'));    

}
module.exports={
    handleProfile : handleProfile
};

// app.get('/profile/:id',(req,res)=>{
//     const found = '0';
//     database.users.forEach(user=>{
//         if(user.id===req.params.id){
//             res.json('you are our member');
//             found = '1';
//         }
//     });
//     if(found==='0'){
//         res.json('not a member');
//     }
// });
