const handleRegister = (req,res,postgres_db,bcrypt) =>{

    if(!req.body.name || !req.body.email || !req.body.password){
        return res.status(400).json('empty field register');
    }
    
    const bhash = bcrypt.hashSync(req.body.password);
    
        postgres_db.transaction( tranx =>{
            tranx.insert({
                email: req.body.email,
                hash:bhash
            }).into('login').returning('email')
            .then(retemail=>{
               return tranx('users').returning('*').insert({
                    email:retemail[0],
                    name:req.body.name,
                    joined:new Date()
                }).then(user => {res.json(user[0])})
            })
            .then(tranx.commit)
            .catch(tranx.rollback)
       })
       .catch(err=> res.status(400).json('email already existed'));
    
    }
    
    module.exports={
        handleRegister : handleRegister
    };

    //  app.post('/register',(req,res)=>{
//     const {name,email,password} = req.body;
//     postgres_db('users').returning('*').insert({
//         email:email,
//         name:name,
//         joined:new Date()
//     }).then(user => res.json(user[0]))
//     .catch(err=> res.status(400).json('email already existed'));
//  });

// app.post('/register',(req,res)=>{
//     const {name,email,password} = req.body;
//     database.users.push({
//         id      : '123',
//         name    : name,
//         email   : email,
//         password: password,
//         entries : 0,
//         joinDate: new Date()
// });
//     res.json(database.users[database.users.length-1]);
// });