const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '6ed2bfc0fc564f8bbff5623cc2aaf01d'
   });
const handleImageUrl = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req,res,postgres_db) =>{

postgres_db('users').where('id','=',req.body.id)
.increment('entries',1)
.returning('entries')
.then(entries=> res.json(entries[0]))
.catch(err=>res.status(400).json('something went wrong'));
        
    }
    module.exports={
        handleImage : handleImage,
        handleImageUrl: handleImageUrl
    };
    

    // app.put('/image',(req,res)=>{
//     let found = '0';
//     database.users.forEach(user=>{
//         if(user.id===req.body.id){
//             user.entries++;
//             found = '1';
//             res.json(user.entries);
//         }
//     });
//     if(found==='0'){
//         res.json('not a member');
//     }
// });
