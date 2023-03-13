const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");
const clarifai = require('clarifai');
const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set("authorization", "Key 6ed2bfc0fc564f8bbff5623cc2aaf01d");
const handleImageUrl = (req, res) => {
  stub.PostModelOutputs(
    {
        model_id: "e466caa0619f444ab97497640cefc4dc",
        // model_id:"2ba4d0b0e53043f38dbbed49e03917b6",
        inputs: [{data: {image: {url: req.body.input}}}]
    },
    metadata,
    (err, response) => {
        if (err) {
            console.log("Error: " + err);
            res.json(err);
            return;
        }
        if (response.status.code !== 10000) {
            console.log("Received failed status: " + response.status.description + "\n" + response.status.details);
            return;
        }
  
        console.log("Predicted concepts, with confidence values:")
        for (const c of response.outputs[0].data.concepts) {
            console.log(c.name + ": " + c.value);
        }
        res.json(response)
    }
  );
};

const handleImage = (req, res, postgres_db,my_database) => {

  if(postgres_db){
  postgres_db("users")
    .where("id", "=", req.body.id)
    .increment("entries", 1)
    .returning("entries")
    .then((entries) => res.json(entries[0]))
    .catch((err) => res.status(400).json("something went wrong"));
  }
  else{
    if(req.body.id === my_database.users[0].id){
      my_database.users[0].entries++;
    res.json(my_database.users[0].entries);}
    else{
      res.status(400).json("something went wrong");
    }
  }
};



module.exports = {
  handleImage: handleImage,
  handleImageUrl: handleImageUrl,
};
