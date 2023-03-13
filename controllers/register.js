const handleRegister = (req, res, postgres_db, bcrypt) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json("empty field register");
  }
  const { email, name, password } = req.body;

  const hash = bcrypt.hashSync(password);
  if(postgres_db){
  postgres_db.transaction(trx => {
    trx.insert({
      hash: hash,
      email: email
    })
    .into('login')
    .returning('email')
    .then(loginEmail => {
      return trx('users')
        .returning('*')
        .insert({
          email: loginEmail[0],
          name: name,
          joined: new Date()
        })
        .then(user => {
          res.json(user[0]);
        })
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })
  .catch(err => res.status(400).json(err))
}
else{
  res.json('success');
}
}

module.exports = {
  handleRegister: handleRegister,
};
